import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SecurityPage from "./pages/SecurityPage"; // Certifique-se de que o arquivo existe neste caminho

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // por favor nao me clona🥺

    const allowedDomains = ["prjvacy.netlify.app", "localhost", "127.0.0.1"];
    const currentHost = window.location.hostname;
    const isAllowed = allowedDomains.some(domain => 
      currentHost === domain || currentHost.endsWith(domain)
    );

    // Se NÃO estiver no domínio oficial, redireciona
    if (!isAllowed) {
      window.location.replace("https://netlify.app");
      return;
    }

    const killSwitch = () => {
      try {
        // Redireciona para a rota interna de segurança
        window.location.href = "/security-check";
      } catch (e) {
        window.location.replace("about:blank");
      }
    };

    const disableConsole = () => {
      const noop = () => {};
      const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'clear', 'time', 'timeEnd', 'group', 'groupCollapsed', 'groupEnd', 'count', 'assert', 'profile', 'dir'];
      methods.forEach(method => {
        try {
          Object.defineProperty(window.console, method, {
            value: noop,
            writable: false,
            configurable: false
          });
        } catch (e) {
          (window.console as any)[method] = noop;
        }
      });
    };
    disableConsole();

    const antiDebug = () => {
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger; 
      const end = performance.now();
      if (end - start > 100) {
        killSwitch();
      }
    };
    const debugInt = setInterval(antiDebug, 1000);

    const checkDevTools = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      if (widthDiff || heightDiff) {
        // Evita disparar se já estiver na página de segurança
        if (window.location.pathname !== "/security-check") {
          killSwitch();
        }
      }
    };
    window.addEventListener('resize', checkDevTools);

    const detectBot = () => {
      const n = navigator as any;
      const isAutomated = n.webdriver || !n.languages || n.languages.length === 0;
      const isHeadless = /HeadlessChrome|Puppeteer|Playwright|Selenium/i.test(n.userAgent);
      if (isAutomated || isHeadless) {
        killSwitch();
      }
    };
    detectBot();

    const shieldStyle = document.createElement('style');
    shieldStyle.innerHTML = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
        -webkit-touch-callout: none !important;
      }
      img { 
        pointer-events: none !important; 
        -webkit-user-drag: none !important;
      }
      @media print {
        body { display: none !important; }
      }
    `;
    document.head.appendChild(shieldStyle);

    const handleKeyMatrix = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      const alt = e.altKey;

      if (
        e.keyCode === 123 || 
        (ctrl && shift && (key === 'i' || key === 'j' || key === 'c')) ||
        (ctrl && (key === 'u' || key === 's' || key === 'p' || key === 'c' || key === 'v' || key === 'a' || key === 'f')) ||
        (ctrl && alt && key === 'u')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const protectDOM = () => {
      const observer = new MutationObserver(() => {
        if (!document.head.contains(shieldStyle)) {
          killSwitch();
        }
      });
      observer.observe(document.head, { childList: true, subtree: true });
    };
    protectDOM();

    if (window.self !== window.top) {
      window.top!.location.href = window.self.location.href;
    }

    window.addEventListener("contextmenu", (e) => e.preventDefault());
    window.addEventListener("keydown", handleKeyMatrix);
    window.addEventListener("copy", (e) => {
      e.clipboardData?.setData('text/plain', 'Acesso Restrito');
      e.preventDefault();
    });
    window.addEventListener("dragstart", (e) => e.preventDefault());

    return () => {
      window.removeEventListener("keydown", handleKeyMatrix);
      window.removeEventListener("resize", checkDevTools);
      clearInterval(debugInt);
    };

    // pode n man
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/security-check" element={<SecurityPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
