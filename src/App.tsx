import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SecurityPage from "./pages/SecurityPage";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const killSwitch = () => {
      document.body.innerHTML = "";
      window.location.href = "about:blank";
    };

    // INICIO AJUSTE - Liberação de ambientes locais e preview
    // Para adicionar mais domínios permitidos, inclua na lista abaixo:
    const allowedDomains = ["privacy-br.com", "localhost", "127.0.0.1", "netlify.app"];
    const currentHost = window.location.hostname;

    // Detecta IPs privados (192.168.x.x | 10.x.x.x | 172.16-31.x.x) — Device Simulator, etc.
    const isPrivateIP = /^(localhost|127\.0\.0\.1|::1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)$/.test(currentHost);

    const isAllowed = isPrivateIP || allowedDomains.some(domain =>
      currentHost === domain || currentHost.endsWith("." + domain)
    );

    if (!isAllowed) {
      killSwitch();
      return;
    }
    // FIM AJUSTE

    // 2. Proteção contra Bots (Superior: sem "as any" e mais precisa)
    const detectBot = () => {
      const isAutomated = ("webdriver" in navigator && navigator.webdriver) ||
                          !navigator.languages ||
                          navigator.languages.length === 0;

      const isHeadless = /HeadlessChrome|Puppeteer|Playwright|Selenium/i.test(navigator.userAgent);

      // Checa se plugins existem (Humanos costumam ter, bots puros não)
      const hasPlugins = navigator.plugins && navigator.plugins.length > 0;

      if ((isAutomated || isHeadless) && !hasPlugins) {
        killSwitch();
      }
    };
    detectBot();

    // 3. Anti-Debugger (Tolerância de 500ms para evitar falsos positivos em hardware lento)
    const antiDebug = () => {
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const end = performance.now();
      if (end - start > 500) {
        killSwitch();
      }
    };
    const debugInt = setInterval(antiDebug, 3000); // Aumentado o intervalo para fluidez

    // 4. Desabilitar Console (Sem erros de tipagem)
    const disableConsole = () => {
      const noop = () => {};
      const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'clear'];
      methods.forEach(method => {
        try {
          // @ts-ignore
          window.console[method as keyof Console] = noop;
        } catch (e) {}
      });
    };
    disableConsole();

    // 5. Proteção de UI via CSS (Impedir seleção e arraste)
    const shieldStyle = document.createElement('style');
    shieldStyle.innerHTML = `
      * {
        -webkit-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
      img { pointer-events: none !important; -webkit-user-drag: none !important; }
      @media print { body { display: none !important; } }
    `;
    document.head.appendChild(shieldStyle);

    // 6. Bloqueio de Teclas de Atalho (F12, Ctrl+U, Ctrl+S, etc)
    const handleKeyMatrix = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;

      if (
        e.keyCode === 123 ||
        (ctrl && shift && (key === 'i' || key === 'j' || key === 'c')) ||
        (ctrl && (key === 'u' || key === 's'))
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 7. Anti-Iframe (Impede o site de rodar dentro de outro)
    if (window.self !== window.top) {
      try {
        window.top!.location.href = window.self.location.href;
      } catch (e) {
        killSwitch();
      }
    }

    // Event Listeners Globais
    window.addEventListener("contextmenu", (e) => e.preventDefault());
    window.addEventListener("keydown", handleKeyMatrix);
    window.addEventListener("copy", (e) => {
      e.clipboardData?.setData('text/plain', 'Acesso Protegido');
      e.preventDefault();
    });

    return () => {
      window.removeEventListener("keydown", handleKeyMatrix);
      window.removeEventListener("contextmenu", (e) => e.preventDefault());
      clearInterval(debugInt);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/security" element={<SecurityPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;