import { useState, useRef, useEffect, useCallback } from 'react';
import {
  X, Play, Pause, RotateCcw, Flag, Smartphone,
  Activity, Zap, Timer, TrendingUp, Award,
  ChevronUp, ChevronDown, Footprints, Gauge
} from 'lucide-react';
import { Product } from '../types';

interface RunTimerProps {
  product: Product;
  onClose: () => void;
}

type RunMode = 'beginner' | 'pro';
type TimerState = 'idle' | 'running' | 'paused';

interface LapData {
  number: number;
  time: number;
  cadence: number;
  steps: number;
}

interface RunStats {
  totalTime: number;
  steps: number;
  cadence: number; // passos por minuto
  estimatedDistance: number; // metros
  pace: number; // min/km
  intensity: 'low' | 'moderate' | 'high' | 'very_high';
}

export function RunTimer({ product, onClose }: RunTimerProps) {
  const [mode, setMode] = useState<RunMode>('beginner');
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<LapData[]>([]);
  const [stats, setStats] = useState<RunStats>({
    totalTime: 0,
    steps: 0,
    cadence: 0,
    estimatedDistance: 0,
    pace: 0,
    intensity: 'low'
  });

  const [motionPermission, setMotionPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [isMotionSupported, setIsMotionSupported] = useState(true);
  const [showInsights, setShowInsights] = useState(false);

  // Refs para tracking
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastStepTimeRef = useRef<number>(0);
  const stepCountRef = useRef<number>(0);
  const cadenceHistoryRef = useRef<number[]>([]);
  const accelerationHistoryRef = useRef<number[]>([]);
  const lapStartTimeRef = useRef<number>(0);
  const lapStepsRef = useRef<number>(0);

  // Detectar suporte a sensores
  useEffect(() => {
    if (!('DeviceMotionEvent' in window)) {
      setIsMotionSupported(false);
    }
  }, []);

  // Solicitar permissão para sensores (iOS 13+)
  const requestMotionPermission = async () => {
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        setMotionPermission(permission === 'granted' ? 'granted' : 'denied');
      } catch {
        setMotionPermission('denied');
      }
    } else {
      // Android e iOS antigo não precisam de permissão explícita
      setMotionPermission('granted');
    }
  };

  // Algoritmo de detecção de passos
  const detectStep = useCallback((acceleration: number) => {
    const STEP_THRESHOLD = 12; // Limiar de aceleração para detectar passo
    const MIN_STEP_INTERVAL = 250; // Mínimo 250ms entre passos (máx ~240 passos/min)

    const now = Date.now();
    accelerationHistoryRef.current.push(acceleration);

    // Manter apenas últimos 10 valores
    if (accelerationHistoryRef.current.length > 10) {
      accelerationHistoryRef.current.shift();
    }

    // Detectar pico de aceleração
    const history = accelerationHistoryRef.current;
    if (history.length >= 3) {
      const prev = history[history.length - 3];
      const curr = history[history.length - 2];
      const next = history[history.length - 1];

      // Pico detectado
      if (curr > prev && curr > next && curr > STEP_THRESHOLD) {
        if (now - lastStepTimeRef.current > MIN_STEP_INTERVAL) {
          stepCountRef.current++;
          lapStepsRef.current++;

          // Calcular cadência instantânea
          const timeSinceLastStep = now - lastStepTimeRef.current;
          const instantCadence = Math.round(60000 / timeSinceLastStep);

          cadenceHistoryRef.current.push(instantCadence);
          if (cadenceHistoryRef.current.length > 20) {
            cadenceHistoryRef.current.shift();
          }

          lastStepTimeRef.current = now;
        }
      }
    }
  }, []);

  // Handler de movimento
  const handleDeviceMotion = useCallback((event: DeviceMotionEvent) => {
    if (timerState !== 'running') return;

    const { accelerationIncludingGravity } = event;
    if (!accelerationIncludingGravity) return;

    const { x, y, z } = accelerationIncludingGravity;
    if (x === null || y === null || z === null) return;

    // Magnitude total da aceleração
    const magnitude = Math.sqrt(x * x + y * y + z * z);
    detectStep(magnitude);
  }, [timerState, detectStep]);

  // Gerenciar listener de movimento
  useEffect(() => {
    if (motionPermission === 'granted' && timerState === 'running') {
      window.addEventListener('devicemotion', handleDeviceMotion);
      return () => window.removeEventListener('devicemotion', handleDeviceMotion);
    }
  }, [motionPermission, timerState, handleDeviceMotion]);

  // Timer principal
  useEffect(() => {
    if (timerState === 'running') {
      timerRef.current = window.setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTimeRef.current;
        setElapsedTime(elapsed);

        // Atualizar stats
        const steps = stepCountRef.current;
        const timeInMinutes = elapsed / 60000;
        const cadence = timeInMinutes > 0 ? Math.round(steps / timeInMinutes) : 0;

        // Estimar distância (stride length médio ~0.75m para corrida)
        const strideLength = 0.75;
        const distance = steps * strideLength;

        // Calcular pace (min/km)
        const distanceKm = distance / 1000;
        const pace = distanceKm > 0 ? timeInMinutes / distanceKm : 0;

        // Determinar intensidade baseada na cadência
        let intensity: RunStats['intensity'] = 'low';
        if (cadence >= 180) intensity = 'very_high';
        else if (cadence >= 165) intensity = 'high';
        else if (cadence >= 150) intensity = 'moderate';

        setStats({
          totalTime: elapsed,
          steps,
          cadence,
          estimatedDistance: Math.round(distance),
          pace,
          intensity
        });
      }, 100);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [timerState]);

  // Controles do timer
  const startTimer = () => {
    if (motionPermission !== 'granted') {
      requestMotionPermission();
      return;
    }

    if (timerState === 'idle') {
      startTimeRef.current = Date.now();
      lapStartTimeRef.current = Date.now();
      stepCountRef.current = 0;
      lapStepsRef.current = 0;
      lastStepTimeRef.current = Date.now();
      accelerationHistoryRef.current = [];
      cadenceHistoryRef.current = [];
    } else if (timerState === 'paused') {
      startTimeRef.current = Date.now() - elapsedTime;
      lapStartTimeRef.current = Date.now() - (elapsedTime - (laps.length > 0 ? laps[laps.length - 1].time : 0));
    }

    setTimerState('running');
  };

  const pauseTimer = () => {
    setTimerState('paused');
  };

  const resetTimer = () => {
    setTimerState('idle');
    setElapsedTime(0);
    setLaps([]);
    setStats({
      totalTime: 0,
      steps: 0,
      cadence: 0,
      estimatedDistance: 0,
      pace: 0,
      intensity: 'low'
    });
    stepCountRef.current = 0;
    lapStepsRef.current = 0;
    accelerationHistoryRef.current = [];
    cadenceHistoryRef.current = [];
    setShowInsights(false);
  };

  const addLap = () => {
    const lapTime = elapsedTime;
    const lapCadence = cadenceHistoryRef.current.length > 0
      ? Math.round(cadenceHistoryRef.current.reduce((a, b) => a + b, 0) / cadenceHistoryRef.current.length)
      : 0;

    setLaps(prev => [...prev, {
      number: prev.length + 1,
      time: lapTime,
      cadence: lapCadence,
      steps: lapStepsRef.current
    }]);

    lapStartTimeRef.current = Date.now();
    lapStepsRef.current = 0;
    cadenceHistoryRef.current = [];
  };

  const finishRun = () => {
    pauseTimer();
    setShowInsights(true);
  };

  // Formatar tempo
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const formatPace = (pace: number) => {
    if (pace === 0 || !isFinite(pace)) return '--:--';
    const minutes = Math.floor(pace);
    const seconds = Math.round((pace - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Gerar insights baseados no tênis
  const generateInsights = () => {
    const insights: string[] = [];
    const { cadence, intensity, estimatedDistance, pace } = stats;

    // Insight baseado na categoria do tênis
    if (product.category === 'elite') {
      if (cadence >= 180) {
        insights.push(`🔥 Cadência elite! O ${product.name} com placa ${product.tech.plate} está maximizando sua propulsão.`);
      } else if (cadence >= 165) {
        insights.push(`⚡ Boa cadência! Para aproveitar 100% da placa de carbono do ${product.name}, tente aumentar para 180+.`);
      } else {
        insights.push(`💡 Com o ${product.name}, você pode aumentar a cadência gradualmente. A placa de carbono ajuda na transição.`);
      }
    } else if (product.category === 'velocidade') {
      if (intensity === 'high' || intensity === 'very_high') {
        insights.push(`🚀 Intensidade perfeita para o ${product.name}! Seu peso de ${product.weight}g está trabalhando a seu favor.`);
      } else {
        insights.push(`⚡ O ${product.name} é feito para velocidade. Tente intervalos de alta intensidade para sentir a diferença!`);
      }
    } else if (product.category === 'rodagem') {
      insights.push(`🏃 O ${product.name} com amortecimento ${product.stats.cushion}/100 está protegendo suas articulações.`);
      if (estimatedDistance > 5000) {
        insights.push(`✅ Ótima distância para rodagem! A espuma ${product.tech.foam} mantém o conforto por mais tempo.`);
      }
    } else if (product.category === 'estabilidade') {
      insights.push(`🛡️ O ${product.name} está corrigindo sua pisada com estabilidade ${product.stats.stability}/100.`);
      if (cadence < 160) {
        insights.push(`💡 Aumentar a cadência para 160+ pode reduzir o impacto e melhorar a eficiência.`);
      }
    }

    // Insights gerais
    if (pace > 0 && pace < 5) {
      insights.push(`🏆 Pace abaixo de 5 min/km! Ritmo de competição!`);
    } else if (pace >= 5 && pace < 6) {
      insights.push(`💪 Pace entre 5-6 min/km. Excelente ritmo de treino!`);
    }

    // Insight sobre responsividade
    if (product.stats.responsiveness >= 85 && intensity === 'very_high') {
      insights.push(`⚡ A responsividade ${product.stats.responsiveness}/100 do ${product.name} está devolvendo energia a cada passada!`);
    }

    return insights;
  };

  // UI do modo iniciante
  const BeginnerMode = () => (
    <div className="flex flex-col items-center justify-center flex-1 px-6">
      {/* Timer Display */}
      <div className="text-center mb-8">
        <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Tempo</p>
        <p className="text-6xl md:text-7xl font-mono font-bold text-white tabular-nums">
          {formatTime(elapsedTime)}
        </p>
      </div>

      {/* Stats simples */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
        <div className="bg-[#0B162A] rounded-2xl p-4 text-center border border-white/5">
          <Footprints className="w-6 h-6 text-[#8CC63F] mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{stats.steps}</p>
          <p className="text-xs text-gray-500">passos</p>
        </div>
        <div className="bg-[#0B162A] rounded-2xl p-4 text-center border border-white/5">
          <Activity className="w-6 h-6 text-[#8CC63F] mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{stats.cadence}</p>
          <p className="text-xs text-gray-500">passos/min</p>
        </div>
      </div>

      {/* Indicador de intensidade */}
      <div className="w-full max-w-xs mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Leve</span>
          <span>Moderado</span>
          <span>Intenso</span>
        </div>
        <div className="h-3 bg-[#0B162A] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              stats.intensity === 'very_high' ? 'w-full bg-red-500' :
              stats.intensity === 'high' ? 'w-3/4 bg-orange-500' :
              stats.intensity === 'moderate' ? 'w-1/2 bg-yellow-500' :
              'w-1/4 bg-[#8CC63F]'
            }`}
          />
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-4">
        {timerState === 'running' ? (
          <>
            <button
              onClick={pauseTimer}
              className="w-20 h-20 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 active:scale-95 transition-transform"
            >
              <Pause size={32} />
            </button>
            <button
              onClick={finishRun}
              className="w-16 h-16 rounded-full bg-[#8CC63F] text-[#050a14] flex items-center justify-center shadow-lg shadow-[#8CC63F]/30 active:scale-95 transition-transform"
            >
              <Flag size={24} />
            </button>
          </>
        ) : (
          <>
            {timerState === 'paused' && (
              <button
                onClick={resetTimer}
                className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center active:scale-95 transition-transform"
              >
                <RotateCcw size={24} />
              </button>
            )}
            <button
              onClick={startTimer}
              className="w-20 h-20 rounded-full bg-[#8CC63F] text-[#050a14] flex items-center justify-center shadow-lg shadow-[#8CC63F]/30 active:scale-95 transition-transform"
            >
              <Play size={32} className="ml-1" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  // UI do modo pro
  const ProMode = () => (
    <div className="flex flex-col flex-1 px-4 overflow-hidden">
      {/* Timer compacto */}
      <div className="text-center py-4 border-b border-white/10">
        <p className="text-5xl font-mono font-bold text-white tabular-nums">
          {formatTime(elapsedTime)}
        </p>
      </div>

      {/* Grid de stats */}
      <div className="grid grid-cols-2 gap-3 py-4">
        <div className="bg-[#0B162A] rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Footprints size={14} className="text-[#8CC63F]" />
            <span className="text-[10px] text-gray-500 uppercase">Passos</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.steps}</p>
        </div>

        <div className="bg-[#0B162A] rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Activity size={14} className="text-[#8CC63F]" />
            <span className="text-[10px] text-gray-500 uppercase">Cadência</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.cadence}<span className="text-sm text-gray-500">/min</span></p>
        </div>

        <div className="bg-[#0B162A] rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-[#8CC63F]" />
            <span className="text-[10px] text-gray-500 uppercase">Distância</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {stats.estimatedDistance >= 1000
              ? `${(stats.estimatedDistance / 1000).toFixed(2)}`
              : stats.estimatedDistance}
            <span className="text-sm text-gray-500">{stats.estimatedDistance >= 1000 ? 'km' : 'm'}</span>
          </p>
        </div>

        <div className="bg-[#0B162A] rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Gauge size={14} className="text-[#8CC63F]" />
            <span className="text-[10px] text-gray-500 uppercase">Pace</span>
          </div>
          <p className="text-2xl font-bold text-white">{formatPace(stats.pace)}<span className="text-sm text-gray-500">/km</span></p>
        </div>
      </div>

      {/* Zona de intensidade */}
      <div className="bg-[#0B162A] rounded-xl p-3 border border-white/5 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-500 uppercase">Zona de Intensidade</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            stats.intensity === 'very_high' ? 'bg-red-500/20 text-red-400' :
            stats.intensity === 'high' ? 'bg-orange-500/20 text-orange-400' :
            stats.intensity === 'moderate' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-[#8CC63F]/20 text-[#8CC63F]'
          }`}>
            {stats.intensity === 'very_high' ? 'MÁXIMO' :
             stats.intensity === 'high' ? 'ALTO' :
             stats.intensity === 'moderate' ? 'MODERADO' : 'LEVE'}
          </span>
        </div>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-colors ${
                (stats.intensity === 'very_high' && i <= 5) ||
                (stats.intensity === 'high' && i <= 4) ||
                (stats.intensity === 'moderate' && i <= 3) ||
                (stats.intensity === 'low' && i <= 2)
                  ? stats.intensity === 'very_high' ? 'bg-red-500' :
                    stats.intensity === 'high' ? 'bg-orange-500' :
                    stats.intensity === 'moderate' ? 'bg-yellow-500' : 'bg-[#8CC63F]'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Laps */}
      {laps.length > 0 && (
        <div className="flex-1 overflow-y-auto mb-3">
          <p className="text-[10px] text-gray-500 uppercase mb-2">Voltas ({laps.length})</p>
          <div className="space-y-2">
            {laps.slice().reverse().map(lap => (
              <div key={lap.number} className="flex items-center justify-between bg-[#0B162A]/50 rounded-lg px-3 py-2 text-sm">
                <span className="text-gray-400">Volta {lap.number}</span>
                <span className="font-mono text-white">{formatTime(lap.time)}</span>
                <span className="text-[#8CC63F]">{lap.cadence} spm</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controles Pro */}
      <div className="flex items-center justify-center gap-3 py-4 border-t border-white/10">
        {timerState === 'running' ? (
          <>
            <button
              onClick={addLap}
              className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center active:scale-95 transition-transform"
            >
              <Flag size={20} />
            </button>
            <button
              onClick={pauseTimer}
              className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 active:scale-95 transition-transform"
            >
              <Pause size={28} />
            </button>
            <button
              onClick={finishRun}
              className="w-14 h-14 rounded-full bg-[#8CC63F] text-[#050a14] flex items-center justify-center shadow-lg shadow-[#8CC63F]/30 active:scale-95 transition-transform"
            >
              <Award size={20} />
            </button>
          </>
        ) : (
          <>
            {timerState === 'paused' && (
              <button
                onClick={resetTimer}
                className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center active:scale-95 transition-transform"
              >
                <RotateCcw size={20} />
              </button>
            )}
            <button
              onClick={startTimer}
              className="w-16 h-16 rounded-full bg-[#8CC63F] text-[#050a14] flex items-center justify-center shadow-lg shadow-[#8CC63F]/30 active:scale-95 transition-transform"
            >
              <Play size={28} className="ml-1" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  // Tela de insights
  const InsightsScreen = () => {
    const insights = generateInsights();

    return (
      <div className="flex flex-col flex-1 px-4 py-6 overflow-y-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#8CC63F]/20 flex items-center justify-center mx-auto mb-3">
            <Award className="w-8 h-8 text-[#8CC63F]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Corrida Finalizada!</h3>
          <p className="text-gray-400 text-sm">Análise do seu treino com {product.name}</p>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#0B162A] rounded-xl p-4 text-center border border-white/5">
            <Timer className="w-5 h-5 text-[#8CC63F] mx-auto mb-2" />
            <p className="text-xl font-bold text-white">{formatTime(stats.totalTime)}</p>
            <p className="text-[10px] text-gray-500 uppercase">Tempo Total</p>
          </div>
          <div className="bg-[#0B162A] rounded-xl p-4 text-center border border-white/5">
            <Footprints className="w-5 h-5 text-[#8CC63F] mx-auto mb-2" />
            <p className="text-xl font-bold text-white">{stats.steps}</p>
            <p className="text-[10px] text-gray-500 uppercase">Passos</p>
          </div>
          <div className="bg-[#0B162A] rounded-xl p-4 text-center border border-white/5">
            <TrendingUp className="w-5 h-5 text-[#8CC63F] mx-auto mb-2" />
            <p className="text-xl font-bold text-white">
              {(stats.estimatedDistance / 1000).toFixed(2)} km
            </p>
            <p className="text-[10px] text-gray-500 uppercase">Distância</p>
          </div>
          <div className="bg-[#0B162A] rounded-xl p-4 text-center border border-white/5">
            <Activity className="w-5 h-5 text-[#8CC63F] mx-auto mb-2" />
            <p className="text-xl font-bold text-white">{stats.cadence}</p>
            <p className="text-[10px] text-gray-500 uppercase">Cadência Média</p>
          </div>
        </div>

        {/* Insights */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Zap size={16} className="text-[#8CC63F]" />
            Insights do {product.name}
          </h4>
          <div className="space-y-3">
            {insights.map((insight, idx) => (
              <div key={idx} className="bg-[#0B162A] rounded-xl p-4 border border-white/5">
                <p className="text-sm text-gray-300 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dados do tênis */}
        <div className="bg-gradient-to-br from-[#8CC63F]/10 to-emerald-500/5 rounded-xl p-4 border border-[#8CC63F]/20 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <p className="font-bold text-white text-sm">{product.name}</p>
              <p className="text-[10px] text-gray-400">{product.weight}g • Drop {product.drop}mm</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-[#60A5FA]">{product.stats.cushion}</p>
              <p className="text-[9px] text-gray-500 uppercase">Amortec.</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#8CC63F]">{product.stats.responsiveness}</p>
              <p className="text-[9px] text-gray-500 uppercase">Resposta</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#F59E0B]">{product.stats.stability}</p>
              <p className="text-[9px] text-gray-500 uppercase">Estabil.</p>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3">
          <button
            onClick={resetTimer}
            className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-colors"
          >
            Nova Corrida
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#8CC63F] text-[#050a14] font-bold text-sm hover:bg-[#7ab32e] transition-colors"
          >
            Finalizar
          </button>
        </div>
      </div>
    );
  };

  // Tela de permissão
  const PermissionScreen = () => (
    <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-[#8CC63F]/20 flex items-center justify-center mb-6">
        <Smartphone className="w-10 h-10 text-[#8CC63F]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Segure o celular na mão</h3>
      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
        O cronômetro usa os sensores do seu celular para contar passos e calcular sua cadência.
        Segure firme enquanto corre!
      </p>

      {!isMotionSupported ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-400 text-sm">
            Seu navegador não suporta sensores de movimento. O cronômetro funcionará sem contagem de passos.
          </p>
        </div>
      ) : motionPermission === 'denied' ? (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-6">
          <p className="text-orange-400 text-sm">
            Permissão negada. Vá nas configurações do navegador para permitir acesso aos sensores.
          </p>
        </div>
      ) : null}

      <button
        onClick={requestMotionPermission}
        className="w-full py-4 rounded-xl bg-[#8CC63F] text-[#050a14] font-bold hover:bg-[#7ab32e] transition-colors flex items-center justify-center gap-2"
      >
        <Activity size={20} />
        {isMotionSupported ? 'Permitir Sensores' : 'Continuar sem Sensores'}
      </button>

      <p className="text-[10px] text-gray-600 mt-4">
        Testando com: {product.name}
      </p>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-end md:items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full h-[90vh] md:h-[85vh] md:max-w-md bg-[#050a14] rounded-t-3xl md:rounded-3xl border-t md:border border-white/10 shadow-2xl flex flex-col animate-slide-up overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-4 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8CC63F] to-emerald-600 flex items-center justify-center">
              <Timer size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Testar na Esteira</h2>
              <p className="text-[10px] text-gray-400">{product.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Toggle */}
            {!showInsights && motionPermission === 'granted' && (
              <div className="flex bg-[#0B162A] rounded-full p-1">
                <button
                  onClick={() => setMode('beginner')}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
                    mode === 'beginner' ? 'bg-[#8CC63F] text-[#050a14]' : 'text-gray-400'
                  }`}
                >
                  INICIANTE
                </button>
                <button
                  onClick={() => setMode('pro')}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
                    mode === 'pro' ? 'bg-[#8CC63F] text-[#050a14]' : 'text-gray-400'
                  }`}
                >
                  PRO
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </header>

        {/* Content */}
        {showInsights ? (
          <InsightsScreen />
        ) : motionPermission !== 'granted' ? (
          <PermissionScreen />
        ) : mode === 'beginner' ? (
          <BeginnerMode />
        ) : (
          <ProMode />
        )}
      </div>
    </div>
  );
}
