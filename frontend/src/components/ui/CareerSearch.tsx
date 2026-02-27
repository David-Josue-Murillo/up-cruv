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
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end justify-center px-4">
        <div className="flex flex-col gap-2 w-full md:w-64">
          <label htmlFor="level-filter" className="text-sm font-semibold text-gold-200 ml-1">
            Nivel Académico
          </label>
          <select
            id="level-filter"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-green-900/40 p-3.5 text-sm text-white shadow-lg backdrop-blur-md transition-all focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20"
          >
            <option value="" className="bg-green-950 text-white font-medium">Todos los niveles</option>
            {levels.map((level) => (
              <option key={level} value={level} className="bg-green-950 text-white font-medium">
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-80">
          <label htmlFor="faculty-filter" className="text-sm font-semibold text-gold-200 ml-1">
            Facultad
          </label>
          <select
            id="faculty-filter"
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-green-900/40 p-3.5 text-sm text-white shadow-lg backdrop-blur-md transition-all focus:border-gold-400/50 focus:ring-2 focus:ring-gold-400/20"
          >
            <option value="" className="bg-green-950 text-white font-medium">Todas las facultades</option>
            {faculties.map((faculty) => (
              <option key={faculty} value={faculty} className="bg-green-950 text-white font-medium">
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
            className="text-sm font-bold text-gold-400 hover:text-gold-300 transition-colors py-2 md:pb-4 md:pt-0"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 sm:px-0">
        {filteredCareers.length > 0 ? (
          filteredCareers.map((career, index) => (
            <div
              key={career.id}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white p-7 sm:p-8 shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] ${index >= 3 ? 'hidden sm:flex' : 'flex'}`}
            >
              <div className="absolute top-0 right-0 p-4">
                <span className="inline-block rounded-full bg-green-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-green-700 border border-green-100">
                  {career.level}
                </span>
              </div>

              <div className="mb-5 text-xs font-semibold text-gold-600 uppercase tracking-wide">
                {career.faculty}
              </div>

              <h3 className="mb-4 font-heading text-xl font-bold text-gray-900 leading-snug transition-colors group-hover:text-green-800">
                {career.name}
              </h3>

              <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-green-600/60">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {career.duration}
              </div>

              <p className="mt-auto text-sm leading-relaxed text-gray-600 transition-colors group-hover:text-gray-950 line-clamp-4">
                {career.graduateProfile}
              </p>

              <div className="mt-10">
                <a
                  href={`/oferta-academica/${career.id}`}
                  className="group/link flex items-center justify-between w-full rounded-2xl bg-gold-400 px-6 py-4.5 text-sm font-bold text-green-950 transition-all duration-300 hover:bg-gold-500 hover:shadow-lg hover:shadow-gold-500/30"
                >
                  <span className="flex items-center gap-2">
                    Ver plan de estudio
                  </span>
                  <div className="flex items-center justify-center transition-transform duration-300 group-hover/link:translate-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center">
            <div className="mb-6 text-5xl opacity-50 grayscale">🔍</div>
            <h3 className="text-2xl font-bold text-white">No hay coincidencias</h3>
            <p className="text-white/60 mt-3 max-w-sm mx-auto">Prueba ajustando los filtros de nivel o facultad para descubrir nuestras carreras.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerSearch;
