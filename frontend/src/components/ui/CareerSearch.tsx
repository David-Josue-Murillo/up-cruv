import React, { useState, useMemo } from 'react';
import { careers, faculties, levels, type Career } from '@/lib/data/careers';

const CareerSearch: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');

  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      const levelMatch = selectedLevel === '' || career.level === selectedLevel;
      const facultyMatch = selectedFaculty === '' || career.faculty === selectedFaculty;
      return levelMatch && facultyMatch;
    });
  }, [selectedLevel, selectedFaculty]);

  return (
    <div className="w-full">
      {/* Filters Section */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end justify-center">
        <div className="flex flex-col gap-2 min-w-[200px]">
          <label htmlFor="level-filter" className="text-sm font-semibold text-gold-200 ml-1">
            Nivel Académico
          </label>
          <select
            id="level-filter"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-green-900/40 p-3 text-sm text-white shadow-lg backdrop-blur-md transition-all focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20"
          >
            <option value="" className="bg-green-950 text-white">Todos los niveles</option>
            {levels.map((level) => (
              <option key={level} value={level} className="bg-green-950 text-white">
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 min-w-[300px]">
          <label htmlFor="faculty-filter" className="text-sm font-semibold text-gold-200 ml-1">
            Facultad
          </label>
          <select
            id="faculty-filter"
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-green-900/40 p-3 text-sm text-white shadow-lg backdrop-blur-md transition-all focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20"
          >
            <option value="" className="bg-green-950 text-white">Todas las facultades</option>
            {faculties.map((faculty) => (
              <option key={faculty} value={faculty} className="bg-green-950 text-white">
                {faculty}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {(selectedLevel || selectedFaculty) && (
          <button
            onClick={() => {
              setSelectedLevel('');
              setSelectedFaculty('');
            }}
            className="text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors pb-3"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCareers.length > 0 ? (
          filteredCareers.map((career) => (
            <div
              key={career.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white p-6 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/50"
            >
              <div className="absolute top-0 right-0 p-3">
                <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 border border-green-100">
                  {career.level}
                </span>
              </div>

              <div className="mb-4 text-xs font-semibold text-gold-600 uppercase tracking-wide">
                {career.faculty}
              </div>

              <h3 className="mb-3 font-heading text-lg font-bold text-gray-900 transition-colors group-hover:text-green-800">
                {career.name}
              </h3>

              <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-green-600/60">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {career.duration}
              </div>

              <p className="mt-auto text-sm leading-relaxed text-gray-600 transition-colors group-hover:text-gray-900 line-clamp-3">
                {career.graduateProfile}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <a
                  href={`/oferta-academica/${career.id}`}
                  className="group/link flex items-center gap-1 text-sm font-bold text-green-700 hover:text-green-900 transition-colors"
                >
                  Ver plan
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="transition-transform group-hover/link:translate-x-1">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </a>
                <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center text-green-700 transition-all duration-300 group-hover:bg-gold-500 group-hover:text-white group-hover:rotate-45">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="mb-4 text-4xl opacity-50">🔍</div>
            <h3 className="text-xl font-bold text-white">No se encontraron carreras</h3>
            <p className="text-white/60 mt-2">Intenta ajustar los filtros para encontrar lo que buscas.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerSearch;
