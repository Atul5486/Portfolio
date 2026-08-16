import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import avatarImage from "../assets/avator.png";

const STORAGE_KEY = "portfolio_chatbot_messages";
const CLOSE_ANIMATION_MS = 240;

const DEFAULT_GREETING = {
  id: "welcome-message",
  role: "chatbot(ai)",
  content:
    "Hi! I am Atul's portfolio assistant. Ask me anything about him.",
  createdAt: new Date().toISOString(),
};

function getInitialMessages() {
  if (typeof window === "undefined") {
    return [DEFAULT_GREETING];
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [DEFAULT_GREETING];
  }

  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    return [DEFAULT_GREETING];
  }

  return [DEFAULT_GREETING];
}

function createReply(userText) {
  const text = userText.toLowerCase();

  if (text.includes("project")) {
    return "You can explore projects in the Projects section. Open any project card to view details.";
  }
  if (text.includes("contact") || text.includes("hire")) {
    return "You can reach out from the Contact section. I am sure the owner would love to connect with you.";
  }
  if (text.includes("skill") || text.includes("tech")) {
    return "Check the Skills section to see technologies, tools, and areas of expertise.";
  }

  return "Thanks for your message! I am here to assist you with information about Atul's portfolio.";
}

function validateUserMessage(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Please enter a message before sending.";
  }

  if (trimmed.length < 2) {
    return "Message must be at least 2 characters long.";
  }

  if (trimmed.length > 500) {
    return "Message must be under 500 characters.";
  }

  if (/^[\s\S]*[\u0000-\u001F\u007F][\s\S]*$/.test(trimmed)) {
    return "Message contains invalid characters.";
  }

  return "";
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(getInitialMessages);
  const [isReplying, setIsReplying] = useState(false);
  const [answer, setAnswer] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const messagesContainerRef = useRef(null);
  const widgetRef = useRef(null);
  const closeTimerRef = useRef(null);

  const hasMessages = useMemo(() => messages.length > 0, [messages]);

  const finalizeClose = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsOpen(false);
    setIsClosing(false);
  }, []);

  const closeWidget = useCallback(() => {
    if (!isOpen || isClosing) {
      return;
    }
    setIsClosing(true);

    closeTimerRef.current = window.setTimeout(() => {
      finalizeClose();
    }, CLOSE_ANIMATION_MS);
  }, [finalizeClose, isClosing, isOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = useCallback((behavior = "auto") => {
    if (!messagesContainerRef.current) {
      return;
    }

    messagesContainerRef.current.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior,
    });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    scrollToBottom(isReplying ? "smooth" : "auto");
  }, [messages, answer, isOpen, isReplying, scrollToBottom]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event) => {
      if (!widgetRef.current) {
        return;
      }

      if (!widgetRef.current.contains(event.target)) {
        closeWidget();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [closeWidget, isOpen]);

  const scrollDrift = Math.min(scrollY * 0.06, 26);
  const imageParallax = Math.min(scrollY * 0.03, 12);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    const validationError = validateUserMessage(trimmed);

    if (validationError) {
      setValidationMessage(validationError);
      return;
    }

    if (isReplying) {
      return;
    }

    setValidationMessage("");

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsReplying(true);
    setAnswer("");

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmed,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body received from backend.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedAnswer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        streamedAnswer += chunk;
        setAnswer(streamedAnswer);
      }

      const botMessage = {
        id: `bot-${Date.now()}`,
        role: "chatbot(ai)",
        content: streamedAnswer.trim() || "No response received from the server.",
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const fallbackText = createReply(trimmed);
      setAnswer(fallbackText);

      const botMessage = {
        id: `bot-${Date.now()}`,
        role: "chatbot(ai)",
        content: fallbackText,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsReplying(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      ref={widgetRef}
      className="fixed right-5 bottom-5 z-9999"
      style={{ transform: `translateY(${scrollDrift}px)` }}
    >
      {isOpen ? (
        <div
          className={`${isClosing ? "animate-[chatClose_220ms_ease-in_forwards]" : "animate-[chatOpen_280ms_ease-out]"} w-96 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-3xl border border-white/25 bg-[linear-gradient(150deg,rgba(15,23,42,0.96),rgba(7,30,48,0.93)_45%,rgba(8,47,73,0.9))] shadow-[0_30px_70px_rgba(2,8,23,0.6)] backdrop-blur-xl`}
          onAnimationEnd={() => {
            if (isClosing) {
              finalizeClose();
            }
          }}
        >
          <div className="relative flex items-center justify-between border-b border-white/15 px-4 py-3.5">
            <div className="pointer-events-none absolute -top-10 -right-8 h-24 w-24 rounded-full bg-emerald-300/25 blur-2xl" />
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 overflow-hidden rounded-xl bg-white/10 p-0.5 ring-1 ring-white/20">
                <img
                  src={avatarImage}
                  alt="Assistant avatar"
                  className="cursor-pointer h-full w-full rounded-[10px] object-cover animate-[botPulse_2.4s_ease-in-out_infinite]"
                />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-wide text-white">
                  Portfolio Assistant
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeWidget}
              className="cursor-pointer border border-white/20 rounded-full px-2 py-1 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Close chatbot"
            >
              X
            </button>
          </div>

          <div
            ref={messagesContainerRef}
            className="chatbot-scrollbar h-72 space-y-2 overflow-y-auto px-3 py-3"
          >
            {hasMessages &&
              messages.map((message) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[72%] rounded-2xl px-2.5 py-1.5 text-[13px] leading-5 ${
                        isUser
                          ? "rounded-br-sm   bg-linear-to-br from-emerald-300 to-emerald-500 text-slate-900 shadow-lg"
                          : "rounded-bl-sm border border-white/10 bg-white/12 text-white"
                      }`}
                    >
                      <p className="mb-0.5 text-[9px] uppercase tracking-wide opacity-80">
                        {message.role}
                      </p>
                      <p className="wrap-break-word">{message.content}</p>
                    </div>
                  </div>
                );
              })}
            {isReplying && answer && (
              <div className="flex justify-start">
                <div className="max-w-[72%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/12 px-2.5 py-1.5 text-[13px] leading-5 text-white">
                  <p className="mb-0.5 text-[9px] uppercase tracking-wide opacity-80">
                    chatbot(ai)
                  </p>
                  <p className="wrap-break-word">{answer}</p>
                </div>
              </div>
            )}
            {isReplying && !answer && (
              <p className="text-xs text-white/70">chatbot(ai) is typing...</p>
            )}
          </div>

          <div className="border-t border-white/15 bg-black/10 p-3">
            <div className="mb-2 min-h-4">
              {validationMessage && (
                <p className="text-xs text-rose-300">{validationMessage}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                  if (validationMessage) {
                    setValidationMessage("");
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type your message"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/60 focus:border-emerald-300"
              />
              <button
                type="button"
                onClick={handleSend}
                className="rounded-xl bg-linear-to-r from-emerald-300 to-emerald-500 px-3 py-2 text-xs font-semibold text-slate-900 shadow-md transition hover:brightness-110"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <span className="pointer-events-none absolute -top-9 -left-18 rounded-full border border-emerald-200/30 bg-slate-950/95 px-3 py-1 text-[11px] font-semibold text-emerald-200 shadow-[0_10px_24px_rgba(16,185,129,0.35)] animate-[askPop_1.9s_ease-in-out_infinite]">
            Ask here
          </span>
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsClosing(false);
            }}
            className="group relative flex h-17 w-17 cursor-pointer items-center justify-center rounded-full bg-[conic-gradient(from_200deg,#67e8f9,#6ee7b7,#34d399,#67e8f9)] p-0.5 shadow-[0_18px_35px_rgba(16,185,129,0.5)] transition hover:scale-105"
            aria-label="Open chatbot"
          >
            <span className="absolute inset-0 rounded-full bg-emerald-300/35 blur-md transition group-hover:bg-emerald-200/45" />
            <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#0f172a] text-white">
              <img
                src={avatarImage}
                alt="Chat assistant"
                className="h-full w-full object-cover animate-[botPulse_2.2s_ease-in-out_infinite]"
                style={{
                  transform: `translateY(${imageParallax}px) scale(1.07)`,
                }}
              />
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_52%)]" />
              <span className="absolute right-1 bottom-1 rounded-full border border-white/30 bg-emerald-300 px-1.5 text-[9px] font-semibold text-slate-900">
                AI
              </span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
