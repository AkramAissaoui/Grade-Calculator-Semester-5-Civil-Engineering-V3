import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { 
  Calculator, 
  HardHat, 
  Building2, 
  Ruler, 
  PenTool, 
  DraftingCompass,
  Mountain,
  BookOpen,
  Languages,
  ChevronDown,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Award,
  Globe
} from 'lucide-react'
import './App.css'

// Language type
type Language = 'fr' | 'en' | 'ar'

// Translations
const translations = {
  fr: {
    title: 'Calculatrice',
    titleHighlight: 'Moyenne',
    subtitle: 'Semestre 5 Génie Civil',
    startButton: 'Commencer',
    modulesTitle: 'Modules du Semestre',
    modulesDescription: 'Saisissez vos notes pour chaque module. La moyenne sera calculée automatiquement.',
    progress: 'Progression',
    coeffFilled: 'coefficients renseignés',
    coeff: 'Coeff',
    td: 'TD',
    tp: 'TP',
    exam: 'Exam',
    calculateButton: 'Calculer la Moyenne',
    resetButton: 'Réinitialiser',
    resultTitle: 'Résultat',
    yourAverage: 'Votre Moyenne du Semestre',
    coefficients: 'Coefficients',
    modules: 'Modules',
    validation: 'Validation',
    precision: 'Précision',
    precisionDesc: 'Calcul exact basé sur les coefficients officiels du programme.',
    structure: 'Structure',
    structureDesc: 'Organisation claire des modules par catégorie et coefficient.',
    performance: 'Performance',
    performanceDesc: 'Suivez votre progression en temps réel semestre après semestre.',
    footerTitle: 'Calculatrice Moyenne',
    footerSubtitle: 'Génie Civil - Semestre 5',
    copyright: '© 2026 Calculatrice Moyenne - Génie Civil. Tous droits réservés.',
    gradeLabels: {
      excellent: 'Excellent',
      veryGood: 'Très Bien',
      good: 'Bien',
      pass: 'Passable',
      fail: 'Insuffisant'
    },
    moduleNames: {
      beton: 'Béton Armé 2',
      sol: 'Mécanique des sols 2',
      materiaux: 'Matériaux de construction 2',
      rdm: 'Résistance des matériaux 3',
      charpente: 'Charpente Métallique 2',
      topo: 'Topographie 2',
      dessin: 'Dessin du BTP',
      dao: 'DAO 2',
      anglais: 'Anglais technique'
    }
  },
  en: {
    title: 'Grade',
    titleHighlight: 'Calculator',
    subtitle: 'Semester 5 Civil Engineering',
    startButton: 'Get Started',
    modulesTitle: 'Semester Modules',
    modulesDescription: 'Enter your grades for each module. The average will be calculated automatically.',
    progress: 'Progress',
    coeffFilled: 'coefficients filled',
    coeff: 'Coeff',
    td: 'TD',
    tp: 'TP',
    exam: 'Exam',
    calculateButton: 'Calculate Average',
    resetButton: 'Reset',
    resultTitle: 'Result',
    yourAverage: 'Your Semester Average',
    coefficients: 'Coefficients',
    modules: 'Modules',
    validation: 'Validation',
    precision: 'Precision',
    precisionDesc: 'Exact calculation based on official program coefficients.',
    structure: 'Structure',
    structureDesc: 'Clear organization of modules by category and coefficient.',
    performance: 'Performance',
    performanceDesc: 'Track your progress in real time semester after semester.',
    footerTitle: 'Grade Calculator',
    footerSubtitle: 'Civil Engineering - Semester 5',
    copyright: '© 2026 Grade Calculator - Civil Engineering. All rights reserved.',
    gradeLabels: {
      excellent: 'Excellent',
      veryGood: 'Very Good',
      good: 'Good',
      pass: 'Pass',
      fail: 'Fail'
    },
    moduleNames: {
      beton: 'Reinforced Concrete 2',
      sol: 'Soil Mechanics 2',
      materiaux: 'Construction Materials 2',
      rdm: 'Strength of Materials 3',
      charpente: 'Steel Structure 2',
      topo: 'Topography 2',
      dessin: 'Technical Drawing',
      dao: 'CAD 2',
      anglais: 'Technical English'
    }
  },
  ar: {
    title: 'حاسب',
    titleHighlight: 'المعدل',
    subtitle: 'الفصل الخامس - هندسة مدنية',
    startButton: 'ابدأ',
    modulesTitle: 'وحدات الفصل الدراسي',
    modulesDescription: 'أدخل درجاتك لكل وحدة. سيتم حساب المعدل تلقائياً.',
    progress: 'التقدم',
    coeffFilled: 'معاملات مدخلة',
    coeff: 'المعامل',
    td: 'TD',
    tp: 'TP',
    exam: 'الامتحان',
    calculateButton: 'احسب المعدل',
    resetButton: 'إعادة تعيين',
    resultTitle: 'النتيجة',
    yourAverage: 'معدلك للفصل الدراسي',
    coefficients: 'المعاملات',
    modules: 'الوحدات',
    validation: 'ناجح',
    precision: 'الدقة',
    precisionDesc: 'حساب دقيق بناءً على معاملات البرنامج الرسمية.',
    structure: 'البنية',
    structureDesc: 'تنظيم واضح للوحدات حسب الفئة والمعامل.',
    performance: 'الأداء',
    performanceDesc: 'تتبع تقدمك في الوقت الفعلي من فصل إلى آخر.',
    footerTitle: 'حاسب المعدل',
    footerSubtitle: 'هندسة مدنية - الفصل الخامس',
    copyright: '© 2026 حاسبة المعدل - الهندسة المدنية. جميع الحقوق محفوظة.',
    gradeLabels: {
      excellent: 'ممتاز',
      veryGood: 'جيد جداً',
      good: 'جيد',
      pass: 'مقبول',
      fail: 'راسب'
    },
    moduleNames: {
      beton: 'الخرسانة المسلحة 2',
      sol: 'ميكانيك التربة 2',
      materiaux: 'مواد البناء 2',
      rdm: 'مقاومة المواد 3',
      charpente: 'الهياكل المعدنية 2',
      topo: 'الطبوغرافيا 2',
      dessin: 'الرسم التقني',
      dao: 'التصميم بمساعدة الحاسوب 2',
      anglais: 'الإنجليزية التقنية'
    }
  }
}

// Module data structure
interface Module {
  id: string
  nameKey: string
  hasTD: boolean
  hasTP: boolean
  hasExam: boolean
  coefficient: number
  icon: React.ReactNode
}

interface Grades {
  td: string
  tp: string
  exam: string
}

interface ModuleGrades {
  [key: string]: Grades
}

// Module definitions
const modules: Module[] = [
  { id: 'beton', nameKey: 'beton', hasTD: true, hasTP: false, hasExam: true, coefficient: 2, icon: <Building2 className="w-5 h-5" /> },
  { id: 'sol', nameKey: 'sol', hasTD: true, hasTP: true, hasExam: true, coefficient: 3, icon: <Mountain className="w-5 h-5" /> },
  { id: 'materiaux', nameKey: 'materiaux', hasTD: false, hasTP: true, hasExam: true, coefficient: 2, icon: <HardHat className="w-5 h-5" /> },
  { id: 'rdm', nameKey: 'rdm', hasTD: true, hasTP: false, hasExam: true, coefficient: 3, icon: <Ruler className="w-5 h-5" /> },
  { id: 'charpente', nameKey: 'charpente', hasTD: true, hasTP: false, hasExam: true, coefficient: 2, icon: <DraftingCompass className="w-5 h-5" /> },
  { id: 'topo', nameKey: 'topo', hasTD: false, hasTP: true, hasExam: true, coefficient: 2, icon: <PenTool className="w-5 h-5" /> },
  { id: 'dessin', nameKey: 'dessin', hasTD: false, hasTP: true, hasExam: false, coefficient: 2, icon: <BookOpen className="w-5 h-5" /> },
  { id: 'dao', nameKey: 'dao', hasTD: false, hasTP: false, hasExam: true, coefficient: 2, icon: <Calculator className="w-5 h-5" /> },
  { id: 'anglais', nameKey: 'anglais', hasTD: false, hasTP: false, hasExam: true, coefficient: 1, icon: <Languages className="w-5 h-5" /> },
]

// Calculate module average
const calculateModuleAverage = (grades: Grades, module: Module): number => {
  const td = parseFloat(grades.td) || 0
  const tp = parseFloat(grades.tp) || 0
  const exam = parseFloat(grades.exam) || 0

  let sum = 0
  let count = 0

  if (module.hasTD && grades.td) {
    sum += td * 0.4
    count += 0.4
  }
  if (module.hasTP && grades.tp) {
    sum += tp * 0.4
    count += 0.4
  }
  if (module.hasExam && grades.exam) {
    sum += exam * 0.6
    count += 0.6
  }

  if (count === 0) return 0
  return sum / count * (count / (module.hasTD && module.hasTP ? 1 : module.hasTD || module.hasTP ? 1 : 1))
}

// Calculate weighted average
const calculateWeightedAverage = (grades: ModuleGrades): { average: number; totalCoeff: number } => {
  let totalWeightedSum = 0
  let totalCoeff = 0

  modules.forEach((module) => {
    const moduleGrades = grades[module.id]
    if (moduleGrades) {
      const hasAnyGrade = (module.hasTD && moduleGrades.td) || 
                          (module.hasTP && moduleGrades.tp) || 
                          (module.hasExam && moduleGrades.exam)
      
      if (hasAnyGrade) {
        const moduleAvg = calculateModuleAverage(moduleGrades, module)
        totalWeightedSum += moduleAvg * module.coefficient
        totalCoeff += module.coefficient
      }
    }
  })

  if (totalCoeff === 0) return { average: 0, totalCoeff: 0 }
  return { average: totalWeightedSum / totalCoeff, totalCoeff }
}

// Get grade color
const getGradeColor = (average: number): string => {
  if (average >= 16) return 'grade-excellent'
  if (average >= 14) return 'grade-good'
  if (average >= 10) return 'grade-pass'
  return 'grade-fail'
}

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1500 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const startValue = displayValue
    const endValue = value

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      const currentValue = startValue + (endValue - startValue) * easeOut
      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  return <span>{displayValue.toFixed(2)}</span>
}

// Language Switcher Component
const LanguageSwitcher = ({ 
  currentLang, 
  onLanguageChange 
}: { 
  currentLang: Language
  onLanguageChange: (lang: Language) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: 'FR' },
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'ar', label: 'العربية', flag: '' }
  ]

  const currentLanguage = languages.find(l => l.code === currentLang)

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white transition-all duration-300 border border-white/20"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLanguage?.flag}</span>
        <span className="text-sm hidden sm:inline">{currentLanguage?.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-ce-border overflow-hidden min-w-[140px] z-50 animate-scale-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-ce-light transition-colors ${
                currentLang === lang.code ? 'bg-ce-yellow/10 text-ce-yellow' : 'text-ce-dark'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="text-sm">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Module Card Component
const ModuleCard = ({ 
  module, 
  grades, 
  onGradeChange,
  index,
  t,
  lang
}: { 
  module: Module
  grades: Grades
  onGradeChange: (field: keyof Grades, value: string) => void
  index: number
  t: typeof translations.en
  lang: Language
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const moduleAvg = calculateModuleAverage(grades, module)
  const hasGrades = grades.td || grades.tp || grades.exam

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          delay: index * 0.08,
          ease: 'power3.out'
        }
      )
    }
  }, [index])

  // Validate and clamp input value
  const validateInput = (value: string): string => {
    if (value === '') return ''
    const num = parseFloat(value)
    if (isNaN(num)) return ''
    if (num < 0) return '0'
    if (num > 20) return '20'
    return value
  }

  const handleInputChange = (field: keyof Grades, value: string) => {
    // Allow empty value and partial inputs
    if (value === '' || value === '.' || /^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value)
      // Only validate complete numbers (not partial like "1.")
      if (!isNaN(numValue) && value !== '.' && !value.endsWith('.')) {
        const validated = validateInput(value)
        onGradeChange(field, validated)
      } else {
        onGradeChange(field, value)
      }
    }
  }

  const handleBlur = (field: keyof Grades, value: string) => {
    const validated = validateInput(value)
    onGradeChange(field, validated)
  }

  return (
    <div 
      ref={cardRef}
      className={`module-card ${hasGrades ? 'border-ce-yellow/50' : ''}`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-ce-yellow/10 rounded-lg text-ce-yellow">
          {module.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-ce-dark text-sm">{(t.moduleNames as Record<string, string>)[module.nameKey]}</h3>
          <span className="text-xs text-ce-concrete">{t.coeff}: {module.coefficient}</span>
        </div>
        {hasGrades && (
          <div className={`text-lg font-bold ${getGradeColor(moduleAvg)}`}>
            {moduleAvg.toFixed(2)}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {module.hasTD && (
          <div className="relative">
            <label className="block text-xs font-medium text-ce-gray mb-1.5">{t.td}</label>
            <input
              type="number"
              min="0"
              max="20"
              step="0.25"
              value={grades.td}
              onChange={(e) => handleInputChange('td', e.target.value)}
              onBlur={(e) => handleBlur('td', e.target.value)}
              placeholder="--"
              className="ce-input text-center py-2.5 text-sm"
            />
          </div>
        )}
        {module.hasTP && (
          <div className="relative">
            <label className="block text-xs font-medium text-ce-gray mb-1.5">{t.tp}</label>
            <input
              type="number"
              min="0"
              max="20"
              step="0.25"
              value={grades.tp}
              onChange={(e) => handleInputChange('tp', e.target.value)}
              onBlur={(e) => handleBlur('tp', e.target.value)}
              placeholder="--"
              className="ce-input text-center py-2.5 text-sm"
            />
          </div>
        )}
        {module.hasExam && (
          <div className="relative">
            <label className="block text-xs font-medium text-ce-gray mb-1.5">{t.exam}</label>
            <input
              type="number"
              min="0"
              max="20"
              step="0.25"
              value={grades.exam}
              onChange={(e) => handleInputChange('exam', e.target.value)}
              onBlur={(e) => handleBlur('exam', e.target.value)}
              placeholder="--"
              className="ce-input text-center py-2.5 text-sm"
            />
          </div>
        )}
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [lang, setLang] = useState<Language>('fr')
  const [grades, setGrades] = useState<ModuleGrades>({})
  const [showResult, setShowResult] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const t = translations[lang]

  // Initialize empty grades
  useEffect(() => {
    const initialGrades: ModuleGrades = {}
    modules.forEach((module) => {
      initialGrades[module.id] = { td: '', tp: '', exam: '' }
    })
    setGrades(initialGrades)
  }, [])

  // Handle grade changes
  const handleGradeChange = useCallback((moduleId: string, field: keyof Grades, value: string) => {
    setGrades((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [field]: value
      }
    }))
  }, [])

  // Calculate and show results
  const handleCalculate = () => {
    setShowResult(true)
    
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  // Reset all grades
  const handleReset = () => {
    const initialGrades: ModuleGrades = {}
    modules.forEach((module) => {
      initialGrades[module.id] = { td: '', tp: '', exam: '' }
    })
    setGrades(initialGrades)
    setShowResult(false)
  }

  // Calculate averages
  const { average, totalCoeff } = calculateWeightedAverage(grades)
  const totalPossibleCoeff = modules.reduce((sum, m) => sum + m.coefficient, 0)
  const progressPercent = (totalCoeff / totalPossibleCoeff) * 100

  // Get grade label based on language
  const getGradeLabel = (average: number): string => {
    if (average >= 16) return t.gradeLabels.excellent
    if (average >= 14) return t.gradeLabels.veryGood
    if (average >= 12) return t.gradeLabels.good
    if (average >= 10) return t.gradeLabels.pass
    return t.gradeLabels.fail
  }

  // Hero animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title',
        { opacity: 0, y: 40, rotateX: 45 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      )
      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' }
      )
      gsap.fromTo('.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'power3.out' }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-ce-light" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/construction-beams.jpg" 
            alt="Construction" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ce-dark/80 via-ce-dark/70 to-ce-dark/90" />
        </div>

        {/* Blueprint Grid Overlay */}
        <div className="absolute inset-0 blueprint-grid-dark opacity-20" />

        {/* Language Switcher */}
        <div className="absolute top-4 right-4 z-20">
          <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 py-20">
          <div className="perspective-1000">
            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-white font-poppins mb-4">
              {t.title} <span className="text-ce-yellow">{t.titleHighlight}</span>
            </h1>
          </div>
          <p className="hero-subtitle text-xl md:text-2xl text-white/80 font-inter mb-8">
            {t.subtitle}
          </p>
          
          <button 
            onClick={() => calculatorRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-cta ce-btn inline-flex items-center gap-2 text-lg"
          >
            <Calculator className="w-5 h-5" />
            {t.startButton}
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ce-light to-transparent" />
      </section>

      {/* Calculator Section */}
      <section 
        ref={calculatorRef}
        className="relative py-16 px-4"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 blueprint-grid opacity-50" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-ce-dark font-poppins mb-3">
              {t.modulesTitle}
            </h2>
            <p className="text-ce-concrete max-w-xl mx-auto">
              {t.modulesDescription}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-ce-gray mb-2">
              <span>{t.progress}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 bg-ce-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-ce-yellow rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-center text-xs text-ce-concrete mt-2">
              {totalCoeff} / {totalPossibleCoeff} {t.coeffFilled}
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                grades={grades[module.id] || { td: '', tp: '', exam: '' }}
                onGradeChange={(field, value) => handleGradeChange(module.id, field, value)}
                index={index}
                t={t}
                lang={lang}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleCalculate}
              className="ce-btn inline-flex items-center justify-center gap-2 text-lg px-12"
            >
              <TrendingUp className="w-5 h-5" />
              {t.calculateButton}
            </button>
            <button 
              onClick={handleReset}
              className="ce-btn-secondary inline-flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t.resetButton}
            </button>
          </div>
        </div>
      </section>

      {/* Result Section */}
      {showResult && (
        <section 
          ref={resultRef}
          className="relative py-16 px-4 animate-fade-in"
        >
          <div className="max-w-2xl mx-auto">
            <div className="result-display">
              {/* Background Pattern */}
              <div className="absolute inset-0 blueprint-grid-dark opacity-30" />
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-ce-yellow" />
                  <span className="text-white/80 text-sm uppercase tracking-wider">{t.resultTitle}</span>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-6">
                  {t.yourAverage}
                </h3>

                <div className="mb-6">
                  <span className={`text-7xl md:text-8xl font-bold ${getGradeColor(average)}`}>
                    <AnimatedCounter value={average} />
                  </span>
                  <span className="text-3xl text-white/60">/20</span>
                </div>

                <div className="flex items-center justify-center gap-2 mb-8">
                  {average >= 10 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`text-lg font-medium ${getGradeColor(average)}`}>
                    {getGradeLabel(average)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">{totalCoeff}</div>
                    <div className="text-xs text-white/60">{t.coefficients}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-white">{modules.length}</div>
                    <div className="text-xs text-white/60">{t.modules}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-ce-yellow">
                      {average >= 10 ? '✓' : '✗'}
                    </div>
                    <div className="text-xs text-white/60">{t.validation}</div>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-ce-yellow/30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-ce-yellow/30 rounded-bl-lg" />
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-ce-yellow/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Ruler className="w-7 h-7 text-ce-yellow" />
              </div>
              <h4 className="font-semibold text-ce-dark mb-2">{t.precision}</h4>
              <p className="text-sm text-ce-concrete">
                {t.precisionDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-ce-yellow/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-7 h-7 text-ce-yellow" />
              </div>
              <h4 className="font-semibold text-ce-dark mb-2">{t.structure}</h4>
              <p className="text-sm text-ce-concrete">
                {t.structureDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-ce-yellow/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-7 h-7 text-ce-yellow" />
              </div>
              <h4 className="font-semibold text-ce-dark mb-2">{t.performance}</h4>
              <p className="text-sm text-ce-concrete">
                {t.performanceDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ce-dark text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Construction Line */}
          <div className="construction-line mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-ce-yellow rounded-lg">
                <HardHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold">{t.footerTitle}</h5>
                <p className="text-sm text-white/60">{t.footerSubtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                9 {t.modules}
              </span>
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                19 {t.coefficients}
              </span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/40">
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
