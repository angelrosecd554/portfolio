import React from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen } from 'lucide-react';

export default function EducationTimeline() {
  const academicMilestones = [
    {
      id: 1,
      year: '2022 - 2026',
      badge: 'BTECH',
      score: 'CGPA : 7.35',
      title: 'Artificial Intelligence and Data Science',
      institution: 'VIMAL JYOTHI ENGINEERING COLLEGE, KANNUR'
    },
    {
      id: 2,
      year: '2020 - 2022',
      badge: 'HIGHER SECONDARY',
      score: 'Score : 87.83%',
      title: 'Higher Secondary School',
      institution: 'GOVT.R.S.R.V.H.S.SCHOOL, VELUR, THRISSUR'
    },
    {
      id: 3,
      year: '2019 - 2020',
      badge: 'HIGH SCHOOL',
      score: 'Score : 100%',
      title: 'High School',
      institution: 'ASSISI ENGLISH MEDIUM HIGHER SECONDARY SCHOOL, THRISSUR'
    }
  ];

  return (
    <section id="education" className="relative py-20 px-6 md:px-12 max-w-4xl mx-auto w-full text-white z-20">
      
      <div className="flex items-center space-x-3 mb-12">
        <BookOpen className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl md:text-3xl font-sans tracking-tight font-bold">
          Academic Journey
        </h2>
      </div>

      <div className="relative pl-8 md:pl-12">
        {/* Vertical Line */}
        <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-blue-500/30" />

        <div className="space-y-8">
          {academicMilestones.map((milestone, idx) => {
            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[37px] md:-left-[53px] top-6 w-4 h-4 rounded-full border-4 border-black bg-blue-500 ring-2 ring-blue-500/50 z-10" />

                <div className="bg-[#11131a] border border-white/5 rounded-2xl p-6 transition-all hover:bg-[#151821] hover:border-white/10 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="space-y-3">
                    <h3 className="text-lg md:text-xl font-sans font-bold text-white">
                      {milestone.institution}
                    </h3>
                    <p className="text-sm font-sans text-lime-400 font-medium">
                      {milestone.title}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-mono font-bold rounded">
                        {milestone.badge}
                      </span>
                      <span className="flex items-center text-gray-400 text-xs font-mono">
                        <Award className="w-3.5 h-3.5 text-yellow-500 mr-1.5" />
                        {milestone.score}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs font-mono rounded">
                      {milestone.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
