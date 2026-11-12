import React, { useState } from 'react';
import { LEGAL_FAQS, LEGAL_FAQ_CATEGORIES, LegalFaqItem } from '../data/legalFaqData';

interface LegalFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export const LegalFaqModal: React.FC<LegalFaqModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  if (!isOpen) return null;

  const filteredFaqs = LEGAL_FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.detailedAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.legalReference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-3xl max-w-3xl w-full border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#012d1d] via-[#004b32] to-[#012d1d] p-5 sm:p-6 text-white flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#92f7c3]/20 border border-[#92f7c3]/30 text-[#92f7c3]">
                <span className="material-symbols-outlined text-lg">gavel</span>
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#92f7c3]">
                Compliance &amp; Marco Legal Argentina
              </span>
            </div>
            <h3 className="font-black text-xl sm:text-2xl tracking-tight text-white">
              Preguntas Frecuentes Legales y Regulatorias
            </h3>
            <p className="text-xs text-white/80 max-w-xl">
              Respuestas fundamentadas en la normativa de la CNV, UIF, ARCA (ex-AFIP), BCRA y el Código Civil y Comercial.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer shrink-0"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Action Bar: Download Official PDF & Highlights */}
        <div className="bg-[#f2ede8] px-5 py-3 border-b border-[#e2dcd6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-[#414844]">
            <span className="material-symbols-outlined text-[#006c48] text-base">verified</span>
            <span className="font-bold">
              Dictamen conforme a Ley 27.349, Ley 27.739 (PSAV) y CCyCN
            </span>
          </div>

          <a
            href="/manual_cumplimiento_regulatorio_argentina_seedgrow.pdf"
            download="manual_cumplimiento_regulatorio_argentina_seedgrow.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#012d1d] hover:bg-[#1b4332] text-white text-xs font-bold transition shadow-xs self-start sm:self-auto cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-[#92f7c3]">picture_as_pdf</span>
            <span>Descargar Manual Completo (PDF)</span>
          </a>
        </div>

        {/* Search Bar & Category Tabs */}
        <div className="p-5 border-b border-outline-variant/20 bg-surface-container-low shrink-0 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tema (ej. fideicomiso, impuestos, UIF, SENASA, retiros, quiebra)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface font-semibold placeholder:text-outline/70 focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-xs font-bold"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {LEGAL_FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-lowest text-outline hover:text-on-surface border border-outline-variant/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'bg-surface-container-lowest border-primary shadow-xs'
                      : 'bg-surface-container-lowest border-outline-variant/25 hover:border-outline-variant/60'
                  }`}
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-primary-fixed text-primary">
                          {faq.badge}
                        </span>
                        <span className="text-[11px] text-outline">
                          · {faq.categoryLabel}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-on-surface leading-snug">
                        {faq.question}
                      </h4>
                      {!isExpanded && (
                        <p className="text-xs text-outline line-clamp-1 font-medium mt-1">
                          {faq.shortAnswer}
                        </p>
                      )}
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isExpanded
                          ? 'bg-primary text-on-primary rotate-180'
                          : 'bg-surface-container-high text-outline'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">expand_more</span>
                    </div>
                  </button>

                  {/* Accordion Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 space-y-3.5 border-t border-outline-variant/15 animate-fadeIn text-xs">
                      {/* Short summary callout */}
                      <div className="p-3 rounded-xl bg-primary-fixed/20 border border-primary-fixed text-primary font-bold leading-relaxed">
                        {faq.shortAnswer}
                      </div>

                      {/* Detailed Legal Analysis */}
                      <div className="text-on-surface-variant leading-relaxed text-xs space-y-2">
                        <p>{faq.detailedAnswer}</p>
                      </div>

                      {/* Legal Citation Footnote Box */}
                      <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">
                          menu_book
                        </span>
                        <div className="space-y-0.5">
                          <span className="font-bold text-[11px] text-on-surface block">
                            Fundamento Jurídico Aplicable:
                          </span>
                          <span className="text-[11px] text-outline font-mono">
                            {faq.legalReference}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center space-y-3">
              <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
              <div className="font-bold text-sm text-on-surface">No se encontraron preguntas</div>
              <p className="text-xs text-outline max-w-sm mx-auto">
                No hay preguntas que coincidan con &ldquo;{searchQuery}&rdquo;. Intenta buscar con términos más generales como &ldquo;escrow&rdquo;, &ldquo;fideicomiso&rdquo; o &ldquo;impuestos&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs cursor-pointer"
              >
                Ver Todas las Preguntas
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-outline shrink-0">
          <span>
            Asesoría legal continua conforme a las resoluciones emitidas por la CNV y la UIF.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-bold transition cursor-pointer"
          >
            Entendido, Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
