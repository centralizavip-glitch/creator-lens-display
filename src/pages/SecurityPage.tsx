// por favor nao me clona 🥺
import { useEffect, useRef, useState } from "react";

const SecurityPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audio1Ref = useRef<HTMLAudioElement>(null);
  const audio2Ref = useRef<HTMLAudioElement>(null);
  const [isStrobeActive, setIsStrobeActive] = useState(false);

  const startChaos = () => {
    // Tira o mudo e dá play no vídeo
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    }
    // Toca o primeiro áudio
    if (audio1Ref.current) {
      audio1Ref.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    const audio1 = audio1Ref.current;
    const audio2 = audio2Ref.current;

    // Detecta o fim do primeiro áudio para começar o flash e o áudio 2
    if (audio1 && audio2) {
      audio1.onended = () => {
        setIsStrobeActive(true);
        audio2.play();
        // Volume militar estourado
        setInterval(() => {
          audio2.volume = 1.0;
          if (videoRef.current) videoRef.current.volume = 1.0;
        }, 10);
      };
    }

    // Adiciona evento para iniciar o caos no primeiro clique do usuário na página
    window.addEventListener("click", startChaos);
    window.addEventListener("touchstart", startChaos);

    return () => {
      window.removeEventListener("click", startChaos);
      window.removeEventListener("touchstart", startChaos);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden z-[999999]">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/m78g34b8yv.mp4"
        loop
        playsInline
        muted // Inicia mutado para o navegador permitir o carregamento
      />

      {isStrobeActive && (
        <div className="absolute inset-0 z-10 pointer-events-none animate-[strobe_0.05s_infinite]" />
      )}

      <div className="relative z-20 flex h-full items-center justify-center pointer-events-none">
        <h1 className="text-white text-4xl md:text-7xl font-black uppercase text-center drop-shadow-[0_0_15px_rgba(0,0,0,1)]">
          não me clona por favor 🥺
        </h1>
      </div>

      <audio ref={audio1Ref} src="/banner.mp3" preload="auto" />
      <audio ref={audio2Ref} src="/bate-cvjnu37887.mp3" preload="auto" />

      <style>{`
        @keyframes strobe {
          0% { background-color: rgba(255, 255, 255, 1); }
          50% { background-color: rgba(255, 0, 0, 1); }
          100% { background-color: rgba(255, 255, 255, 1); }
        }
      `}</style>
    </div>
  );
};

export default SecurityPage;
// pode n man
