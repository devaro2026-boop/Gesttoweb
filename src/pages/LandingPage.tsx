import React, { useState } from 'react';
import { 
  Calendar, Users, MapPin, MessageSquare, ShieldCheck, Zap, Star, 
  CheckCircle2, ChevronRight, Phone, Sparkles, Clock, DollarSign, 
  Menu, X, ExternalLink, Calculator, ArrowRight, HeartHandshake, Scissors, Stethoscope, Home
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'professionals' | 'clients'>('professionals');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  // CEP Calculator State
  const [cepInput, setCepInput] = useState('');
  const [cepResult, setCepResult] = useState<{
    neighborhood?: string;
    city?: string;
    distance?: number;
    fee?: number;
    success?: boolean;
  } | null>(null);
  const [cepLoading, setCepLoading] = useState(false);

  // Interactive Booking Demo State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [serviceType, setServiceType] = useState('presencial');
  const [selectedService, setSelectedService] = useState('Corte & Escova Modelada');
  const [selectedProfessional, setSelectedProfessional] = useState('Mariana Costa');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleCepCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cepInput || cepInput.replace(/\D/g, '').length < 8) {
      alert('Por favor, digite um CEP válido com 8 dígitos.');
      return;
    }
    setCepLoading(true);
    setTimeout(() => {
      // Mock calculation based on CEP
      const cleanCep = cepInput.replace(/\D/g, '');
      const dist = (parseInt(cleanCep.slice(0, 3), 10) % 15) + 3;
      const fee = dist * 3.50 + 10;
      setCepResult({
        neighborhood: 'Jardins / Zona Sul',
        city: 'São Paulo - SP',
        distance: dist,
        fee: parseFloat(fee.toFixed(2)),
        success: true
      });
      setCepLoading(false);
    }, 600);
  };

  const handleWhatsAppClick = (message = "Olá! Gostaria de saber mais sobre o Gestto e agendar uma demonstração.") => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5511999999999?text=${encoded}`, '_blank');
  };

  const faqs = [
    {
      q: "O Gestto serve tanto para atendimento no salão quanto a domicílio?",
      a: "Sim! Essa é a nossa principal especialidade. Você pode configurar serviços presenciais (no seu espaço) e serviços a domicílio com cálculo automático de taxa de deslocamento baseada no CEP do cliente."
    },
    {
      q: "Como funciona o cálculo de taxa de deslocamento por CEP?",
      a: "O sistema integra validação de CEP e calcula a distância aproximada ou aplica uma tabela de taxas por raio/bairro configurada por você. O valor do deslocamento já é somado automaticamente no momento em que o cliente agenda."
    },
    {
      q: "O cliente precisa baixar aplicativo para agendar?",
      a: "Não! O cliente agenda direto pelo seu link personalizado (ex: gestto.com/sualoja) em 3 cliques, direto pelo celular ou computador, sem fricção."
    },
    {
      q: "Como funcionam os lembretes via WhatsApp?",
      a: "O Gestto envia confirmações automáticas após o agendamento e lembretes inteligentes (24h e 2h antes) direto no WhatsApp do cliente, reduzindo o não-comparecimento (no-show) em até 90%."
    },
    {
      q: "Posso gerenciar mais de um profissional na mesma agenda?",
      a: "Sim! Temos soluções voltadas para profissionais autônomos e também para salões e clínicas de grande porte com múltiplos colaboradores, comissões e agendas separadas."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* HEADER TOP BAR CONTRACT */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <a href="#" className="text-xl font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span>Ges<span className="text-rose-500">tto</span></span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#recursos" className="hover:text-white transition-colors whitespace-nowrap shrink-0">Recursos</a>
            <a href="#como-funciona" className="hover:text-white transition-colors whitespace-nowrap shrink-0">Como Funciona</a>
            <a href="#calculadora-cep" className="hover:text-white transition-colors whitespace-nowrap shrink-0">Taxa por CEP</a>
            <a href="#depoimentos" className="hover:text-white transition-colors whitespace-nowrap shrink-0">Depoimentos</a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setBookingModalOpen(true)}
              className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-all whitespace-nowrap shrink-0"
            >
              Testar Agendamento
            </button>
            <button 
              onClick={() => handleWhatsAppClick()}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-3">
            <a href="#recursos" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-white py-1">Recursos</a>
            <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-white py-1">Como Funciona</a>
            <a href="#calculadora-cep" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-white py-1">Taxa por CEP</a>
            <a href="#depoimentos" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-slate-300 hover:text-white py-1">Depoimentos</a>
            <button 
              onClick={() => { setBookingModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full mt-2 py-2.5 text-xs font-semibold text-white bg-slate-800 rounded-lg"
            >
              Testar Agendamento Interativo
            </button>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/30 via-slate-950/80 to-slate-950 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Salões, Clínicas e Atendimento a Domicílio em uma só plataforma</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]" style={{ textWrap: 'balance' }}>
                Revolucione seus agendamentos na <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300">clínica, no salão ou a domicílio</span>
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Gerencie sua agenda profissional com cálculo inteligente de taxa de deslocamento por CEP, lembretes automáticos no WhatsApp e cobrança integrada. Clientes agendam em 3 cliques.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button 
                  onClick={() => handleWhatsAppClick("Olá! Quero testar o Gestto e falar com um especialista no WhatsApp.")}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-3 text-base"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Falar com Especialista no WhatsApp</span>
                </button>

                <button 
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-base"
                >
                  <span>Testar App ao Vivo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Badges below Hero */}
              <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sem taxa de adesão</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Cálculo automático de CEP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp oficial</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-amber-500 rounded-3xl blur-xl opacity-30 animate-pulse" />
                <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl">
                  <img 
                    src="/src/assets/images/hero_hybrid_salon_1792992663346.jpg" 
                    alt="Salão e Clínica Moderna Gestto" 
                    className="w-full h-auto object-cover aspect-[4/3]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-6">
                    <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/60 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-rose-400 font-semibold">Agendamento Concluído</p>
                        <p className="text-sm font-bold text-white">Atendimento a Domicílio (CEP 01415-000)</p>
                        <p className="text-xs text-slate-400">Taxa de deslocamento calculada: R$ 25,00</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        ✓
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK STATS STRIP */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl lg:text-4xl font-bold text-white tabular-nums">+85%</p>
            <p className="text-xs lg:text-sm text-slate-400 mt-1">Redução de faltas (No-show)</p>
          </div>
          <div>
            <p className="text-3xl lg:text-4xl font-bold text-white tabular-nums">3 Cliques</p>
            <p className="text-xs lg:text-sm text-slate-400 mt-1">Para seu cliente agendar</p>
          </div>
          <div>
            <p className="text-3xl lg:text-4xl font-bold text-white tabular-nums">100%</p>
            <p className="text-xs lg:text-sm text-slate-400 mt-1">Integrado com WhatsApp</p>
          </div>
          <div>
            <p className="text-3xl lg:text-4xl font-bold text-white tabular-nums">R$ 0</p>
            <p className="text-xs lg:text-sm text-slate-400 mt-1">Taxa sobre seus ganhos</p>
          </div>
        </div>
      </section>

      {/* DUAL AUDIENCE SECTION (PARA PROFISSIONAIS VS PARA CLIENTES) */}
      <section id="recursos" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
              Feito para quem atende e para quem é atendido
            </h2>
            <p className="text-slate-400 text-base">
              Experiência otimizada para profissionais liberais, donos de salão e clientes finais que buscam praticidade.
            </p>

            {/* Segmented Control Tabs */}
            <div className="inline-flex items-center gap-1 p-1 bg-slate-900 rounded-xl mt-8 border border-slate-800">
              <button 
                onClick={() => setActiveTab('professionals')}
                className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'professionals' 
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Para Profissionais e Salões
              </button>
              <button 
                onClick={() => setActiveTab('clients')}
                className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'clients' 
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Para Clientes Finais
              </button>
            </div>
          </div>

          {activeTab === 'professionals' ? (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Atendimento a Domicílio com Cálculo por CEP</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Defina sua base de atendimento e deixe que o sistema calcule a distância e adicione a taxa de deslocamento automaticamente no orçamento do cliente.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Agenda Inteligente Multi-Profissional</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Organize horários de múltiplos colaboradores, bloqueie pausas, gerencie comissões e evite conflitos de horário em tempo real.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Lembretes Automáticos via WhatsApp</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Confirmação instantânea após o agendamento e lembrete automático 24h e 2h antes. Reduza os furos na agenda a quase zero.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Agendamento em 3 Cliques</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Escolha o serviço, selecione o profissional ou atendimento a domicílio, escolha o horário e pronto! Sem senhas ou burocracia.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Na Clínica ou no seu Endereço</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  O cliente decide se prefere ir ao salão/clínica ou receber o atendimento no conforto de sua casa com total transparência na taxa.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Histórico e Comprovantes Digitais</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Acesse facilmente todos os seus agendamentos passados, reagende com 1 clique e receba notificações direto no seu WhatsApp.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* INTERACTIVE CEP CALCULATOR WIDGET SECTION */}
      <section id="calculadora-cep" className="py-24 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
                <Calculator className="w-3.5 h-3.5" />
                <span>Exclusivo para Atendimento a Domicílio</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Simulador de Taxa de Deslocamento por CEP
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Profissionais de estética, manicures e terapeutas que atendem a domicílio sofrem para calcular o custo do combustível e tempo. O Gestto resolve isso calculando automaticamente com base no CEP do cliente.
              </p>
              
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Cálculo automático baseado na distância do seu endereço base</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Definição de raio máximo de atendimento por profissional</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Inclusão opcional de pedágio ou taxa fixa por bairro</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl shadow-2xl relative">
                <div className="absolute -top-3 -right-3 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Teste Interativo
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Simule o CEP do seu Cliente</h3>
                <p className="text-sm text-slate-400 mb-6">Digite um CEP para testar o cálculo automático de deslocamento:</p>

                <form onSubmit={handleCepCalculate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">CEP de Destino</label>
                    <div className="flex gap-3">
                      <input 
                        type="text" 
                        placeholder="Ex: 01415-000"
                        value={cepInput}
                        onChange={(e) => setCepInput(e.target.value)}
                        maxLength={9}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500 font-mono"
                      />
                      <button 
                        type="submit"
                        disabled={cepLoading}
                        className="px-6 py-3 bg-rose-600 hover:bg-rose-500 font-semibold text-white rounded-xl transition-all shadow-lg shadow-rose-600/20 whitespace-nowrap"
                      >
                        {cepLoading ? 'Calculando...' : 'Calcular Taxa'}
                      </button>
                    </div>
                  </div>
                </form>

                {cepResult && (
                  <div className="mt-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 animate-fadeIn">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-xs text-slate-400">Endereço Identificado</p>
                        <p className="text-sm font-bold text-white">{cepResult.neighborhood}, {cepResult.city}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-lg">
                        Área Atendida ✓
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800 text-sm">
                      <div>
                        <p className="text-xs text-slate-400">Distância Estimada</p>
                        <p className="font-bold text-white">{cepResult.distance} km da base</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Taxa de Deslocamento</p>
                        <p className="font-bold text-rose-400">R$ {cepResult.fee?.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ADDITIONAL FEATURES BENTO GRID */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Tudo o que seu negócio precisa</h2>
            <p className="text-slate-400">Tecnologia de ponta para automatizar sua rotina e impressionar seus clientes.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Painel Administrativo</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">Gestão financeira e relatórios em tempo real</h3>
                <p className="text-slate-400 text-sm">Acompanhe faturamento diário, serviços mais vendidos e histórico completo de cada cliente.</p>
              </div>
              <div className="mt-8 rounded-xl overflow-hidden border border-slate-800">
                <img src="/src/assets/images/feature_dashboard_1792992662955.jpg" alt="Dashboard" className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Atendimento a Domicílio</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">Profissionais na estrada com segurança</h3>
                <p className="text-slate-400 text-sm">Organize rotas de atendimento externo, confirme presença e receba avaliações dos clientes após o serviço.</p>
              </div>
              <div className="mt-8 rounded-xl overflow-hidden border border-slate-800">
                <img src="/src/assets/images/feature_home_visit_1792992663531.jpg" alt="Atendimento a domicílio" className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">WhatsApp Oficial</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">Comunicação automatizada sem esforço</h3>
                <p className="text-slate-400 text-sm">Disparos automáticos de confirmação, lembrete e pesquisa de satisfação direto no WhatsApp do cliente.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">✓</div>
                  <div className="text-xs">
                    <p className="font-bold text-white">Lembrete enviado com sucesso</p>
                    <p className="text-slate-400">Cliente: Ana Souza (Amanhã às 14h)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / SOCIAL PROOF */}
      <section id="depoimentos" className="py-24 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Aprovado por quem faz acontecer</h2>
            <p className="text-slate-400">Veja como manicures, esteticistas e donos de salão transformaram seus negócios com o Gestto.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  "Atendo tanto no meu espaço quanto a domicílio. Antes eu perdia muito tempo calculando quanto cobrar de gasolina por bairro. Com o cálculo por CEP automático, meus clientes já pagam a taxa certa direto no link!"
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-600/20 text-rose-400 font-bold flex items-center justify-center">
                  MC
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Marcela Castro</p>
                  <p className="text-xs text-slate-400">Manicure & Nail Designer (SP)</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  "O lembrete automático no WhatsApp reduziu nossas faltas em quase 90%. Nossos clientes adoram a facilidade de agendar em 3 cliques pelo celular."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center">
                  DR
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Dr. Ricardo Almeida</p>
                  <p className="text-xs text-slate-400">Clínica Estética Integrada</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  "Gerencio uma equipe de 6 profissionais. A divisão de agendas e o controle de comissões economizaram horas da nossa recepção toda semana. Indispensável!"
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-600/20 text-amber-400 font-bold flex items-center justify-center">
                  BS
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Bruna Soares</p>
                  <p className="text-xs text-slate-400">Proprietária de Salão de Beleza</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Perguntas Frequentes</h2>
            <p className="text-slate-400">Tire suas dúvidas sobre o funcionamento do Gestto.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-semibold text-white flex justify-between items-center hover:bg-slate-900/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-rose-500 font-bold text-lg">{faqOpen === idx ? '−' : '+'}</span>
                </button>
                {faqOpen === idx && (
                  <div className="px-6 pb-4 text-slate-400 text-sm leading-relaxed border-t border-slate-900 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-white">Ges<span className="text-rose-500">tto</span></span>
          </div>

          <p className="text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} Gestto. Todos os direitos reservados. Feito para Salões, Clínicas e Atendimento a Domicílio.
          </p>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleWhatsAppClick()}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg flex items-center gap-2 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Suporte WhatsApp</span>
            </button>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE BOOKING DEMO MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-fadeIn">
            <button 
              onClick={() => { setBookingModalOpen(false); setBookingStep(1); setBookingConfirmed(false); }}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Demonstração Interativa</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-6">
              {bookingConfirmed ? 'Agendamento Confirmado! 🎉' : `Passo ${bookingStep} de 3: Agendamento Rápido`}
            </h3>

            {!bookingConfirmed ? (
              <div className="space-y-6">
                {bookingStep === 1 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-300">Escolha o tipo de atendimento:</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => setServiceType('presencial')}
                        className={`p-4 rounded-xl border text-left transition-all ${serviceType === 'presencial' ? 'border-rose-500 bg-rose-500/10 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'}`}
                      >
                        <p className="font-bold text-sm">No Salão / Clínica</p>
                        <p className="text-xs opacity-80 mt-1">Atendimento presencial</p>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setServiceType('domicilio')}
                        className={`p-4 rounded-xl border text-left transition-all ${serviceType === 'domicilio' ? 'border-rose-500 bg-rose-500/10 text-white' : 'border-slate-800 bg-slate-950 text-slate-400'}`}
                      >
                        <p className="font-bold text-sm">A Domicílio</p>
                        <p className="text-xs opacity-80 mt-1">Com taxa por CEP</p>
                      </button>
                    </div>

                    <label className="block text-sm font-medium text-slate-300 mt-4">Serviço desejado:</label>
                    <select 
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm"
                    >
                      <option>Corte & Escova Modelada (R$ 90)</option>
                      <option>Manicure & Pedicure Completa (R$ 65)</option>
                      <option>Limpeza de Pele Profunda (R$ 150)</option>
                      <option>Design de Sobrancelhas (R$ 50)</option>
                    </select>

                    <button 
                      onClick={() => setBookingStep(2)}
                      className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-rose-600/30"
                    >
                      Avançar para Horário
                    </button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-slate-300">Escolha o Profissional:</label>
                    <select 
                      value={selectedProfessional}
                      onChange={(e) => setSelectedProfessional(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm"
                    >
                      <option>Mariana Costa (Especialista)</option>
                      <option>Carlos Silva (Master Stylist)</option>
                      <option>Ana Paula (Esteticista)</option>
                    </select>

                    <label className="block text-sm font-medium text-slate-300 mt-4">Horário disponível para amanhã:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['09:00', '11:00', '14:30', '16:00', '17:30', '19:00'].map((time) => (
                        <button key={time} className="py-2.5 bg-slate-950 border border-slate-800 hover:border-rose-500 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all">
                          {time}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={() => setBookingStep(1)}
                        className="w-1/3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm"
                      >
                        Voltar
                      </button>
                      <button 
                        onClick={() => setBookingStep(3)}
                        className="w-2/3 py-3 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-rose-600/30"
                      >
                        Avançar para Dados
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Seu Nome Completo</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Beatriz Lima"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Seu WhatsApp (para confirmação)</label>
                      <input 
                        type="text" 
                        placeholder="(11) 99999-9999"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>

                    {serviceType === 'domicilio' && (
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">CEP de Atendimento a Domicílio</label>
                        <input 
                          type="text" 
                          placeholder="01415-000"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm font-mono"
                        />
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button 
                        onClick={() => setBookingStep(2)}
                        className="w-1/3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm"
                      >
                        Voltar
                      </button>
                      <button 
                        onClick={() => {
                          if (!clientName) {
                            alert('Por favor, informe seu nome.');
                            return;
                          }
                          setBookingConfirmed(true);
                        }}
                        className="w-2/3 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-emerald-600/30"
                      >
                        Confirmar Agendamento
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-white">Tudo pronto, {clientName || 'Cliente'}!</h4>
                <p className="text-slate-400 text-sm max-w-sm mx-auto">
                  Enviamos os detalhes e o comprovante do seu agendamento para o WhatsApp informado. O profissional {selectedProfessional} já foi notificado.
                </p>
                <button 
                  onClick={() => { setBookingModalOpen(false); setBookingStep(1); setBookingConfirmed(false); }}
                  className="px-6 py-3 bg-rose-600 text-white font-semibold rounded-xl text-sm mt-4"
                >
                  Fechar Demonstração
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
