"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { 
  Phone, Mail, Check, Star, 
  ArrowRight, Instagram, Facebook, 
  ChefHat, Heart, Users, Utensils, Loader2
} from "lucide-react";

// Types pour le formulaire
type FormInputs = {
  user_name: string;
  user_email: string;
  user_phone: string;
  guest_count: number;
  event_type: string;
  preferences: string;
  message: string;
};

export default function Home() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Récupération des variables d'environnement
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateAdmin = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN;
    const templateClient = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CLIENT;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Vérification de sécurité
    if (!serviceID || !templateAdmin || !templateClient || !publicKey) {
        console.error("Configuration EmailJS manquante dans .env.local");
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
    }

    try {
      // 1. Envoi à l'ADMIN (Toi)
      await emailjs.send(
        serviceID,
        templateAdmin,
        {
          nom: data.user_name,       // Mapping: user_name -> {{nom}}
          email: data.user_email,    // Mapping: user_email -> {{email}}
          telephone: data.user_phone,
          invites: data.guest_count,
          type: data.event_type,
          preferences: data.preferences,
          message: data.message,
        },
        publicKey
      );

      console.log("✅ Email Admin envoyé");

      // 2. Envoi de la confirmation au CLIENT (Hamid)
      await emailjs.send(
        serviceID,
        templateClient,
        {
          nom: data.user_name,      // Pour le "Akwaba, {{nom}}"
          email: data.user_email,   // Important pour le champ "To Email"
          type: data.event_type,    // Pour rappeler le type d'événement
        },
        publicKey
      );

      console.log("✅ Email Client envoyé");
      setSubmitStatus('success');
      reset();

    } catch (error) {
      console.error("❌ Erreur d'envoi", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden selection:bg-orange-200 selection:text-orange-900 font-sans text-stone-800">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-4 left-4 right-4 md:left-10 md:right-10 z-50 bg-white/90 backdrop-blur-xl shadow-lg border border-white/40 rounded-full px-6 py-4 transition-all duration-300">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-serif font-bold text-green-900 tracking-tighter cursor-pointer flex items-center gap-2">
            Alièfè<span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          </div>
          
          <div className="hidden lg:flex space-x-8 items-center font-medium text-stone-600 text-sm tracking-wide">
            {['Accueil', 'Concept', 'Menu', 'Histoire', 'Tarifs'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-orange-600 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <a href="#contact" className="hidden md:flex items-center gap-2 bg-green-900 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200 transform hover:-translate-y-1 font-medium text-sm">
            Demander un devis <ArrowRight size={16} />
          </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="accueil" className="relative h-[110vh] flex items-center justify-center overflow-hidden -mt-20">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full animate-slow-zoom">
            <Image 
              src="/images/1.jpeg" 
              alt="Table de fête ivoirienne" 
              fill 
              className="object-cover brightness-[0.60]" 
              priority
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-stone-50 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8 mt-20">
          <div className="inline-block animate-fade-up">
            <span className="bg-orange-500/20 text-orange-200 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
              Traiteur Ivoirien & Événementiel
            </span>
          </div>
          <h1 className="animate-fade-up delay-100 text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] drop-shadow-2xl">
            L’authenticité ivoirienne <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-amber-500 italic">
              au cœur de vos événements
            </span>
          </h1>
          <p className="animate-fade-up delay-200 text-lg md:text-2xl text-stone-200 font-light max-w-3xl mx-auto leading-relaxed">
            Alièfè Traiteur, c’est l’alliance parfaite entre tradition ivoirienne et élégance moderne au Maroc.
          </p>
          <div className="animate-fade-up delay-300 flex flex-col md:flex-row gap-4 justify-center items-center pt-8">
            <a href="#contact" className="w-full md:w-auto px-8 py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all duration-300 shadow-xl shadow-orange-900/20 text-center">
              Demander un devis
            </a>
            <a href="#menu" className="w-full md:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-medium hover:bg-white/20 transition-all text-center">
              Découvrir la carte
            </a>
          </div>
        </div>
      </section>

      {/* --- CONCEPT & PRÉSENTATION --- */}
      <section id="concept" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8 order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
                L'Alliance parfaite entre <br/>
                <span className="text-green-800 italic">Tradition & Modernité</span>
              </h2>
              <div className="space-y-6 text-lg text-stone-600 leading-relaxed font-light">
                <p>
                  Nous sublimons vos mariages, anniversaires et événements professionnels à travers une cuisine authentique, savoureuse et généreusement présentée.
                </p>
                <p>
                  Chaque plat est préparé avec des produits frais et un savoir-faire passionné, pour offrir à vos invités une expérience culinaire inoubliable.
                </p>
                <p className="text-orange-700 font-medium">
                  Faites de votre événement un moment unique aux saveurs de la Côte d’Ivoire.
                </p>
              </div>

              {/* Points forts */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex flex-col gap-2">
                   <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"><Heart size={20}/></div>
                   <h4 className="font-bold text-stone-800">Cuisine avec le cœur</h4>
                   <p className="text-xs text-stone-500">Comme à la maison</p>
                </div>
                <div className="flex flex-col gap-2">
                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700"><Users size={20}/></div>
                   <h4 className="font-bold text-stone-800">Saveurs qui rassemblent</h4>
                   <p className="text-xs text-stone-500">Moments de partage</p>
                </div>
                <div className="flex flex-col gap-2">
                   <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"><Check size={20}/></div>
                   <h4 className="font-bold text-stone-800">Équipe à l'écoute</h4>
                   <p className="text-xs text-stone-500">Accompagnement VIP</p>
                </div>
                <div className="flex flex-col gap-2">
                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700"><Utensils size={20}/></div>
                   <h4 className="font-bold text-stone-800">Service convivial</h4>
                   <p className="text-xs text-stone-500">Comme en famille</p>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 h-[600px]">
              <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-[2rem] overflow-hidden shadow-2xl z-10 animate-float">
                <Image src="/images/2.jpeg" alt="Plat signature" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-[2rem] overflow-hidden shadow-2xl z-20 border-8 border-stone-50" style={{animationDelay: '-2s'}}>
                <Image src="/images/3.jpeg" alt="Service traiteur" fill className="object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- MENU COMPLET --- */}
      <section id="menu" className="py-32 bg-stone-900 text-stone-50 rounded-[3rem] mx-2 md:mx-6 overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-orange-400 tracking-widest text-sm font-bold uppercase mb-4 block">Notre Carte</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Nos Spécialités Phares</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* 1. PLATS TRADITIONNELS (Liste complète) */}
            <div className="bg-white text-stone-800 rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition-transform duration-500 group">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-8 mx-auto group-hover:scale-110 transition-transform">
                <ChefHat size={32} />
              </div>
              <h3 className="text-2xl font-bold text-center mb-6 font-serif">Plats Traditionnels</h3>
              
              <ul className="space-y-3 text-stone-600">
                <li className="flex justify-between border-b border-stone-100 pb-2"><span>Attiéké poisson braisé</span><span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span></li>
                <li className="flex justify-between border-b border-stone-100 pb-2"><span>Alloco (Banane frite)</span><span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span></li>
                <li className="flex justify-between border-b border-stone-100 pb-2"><span>Kedjenou de poulet</span><span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span></li>
                <li className="flex justify-between border-b border-stone-100 pb-2"><span>Garba (Attiéké & Thon)</span><span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span></li>
                <li className="flex justify-between border-b border-stone-100 pb-2"><span>Foutou banane sauce graine</span><span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span></li>
                <li className="flex justify-between border-b border-stone-100 pb-2"><span>Foufou sauce arachide</span><span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span></li>
                <li className="flex justify-between border-b border-stone-100 pb-2"><span>Riz gras ivoirien</span><span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span></li>
                <li className="flex justify-between pt-2"><span>Sauce gombo / feuille</span><span className="w-2 h-2 rounded-full bg-orange-500 mt-2"></span></li>
              </ul>
            </div>

            {/* 2. BOISSONS (Liste complète avec image) */}
            <div className="bg-stone-800 text-white rounded-3xl p-0 shadow-xl hover:-translate-y-2 transition-transform duration-500 overflow-hidden group border border-stone-700">
              <div className="h-48 relative">
                 <Image src="/images/4.jpeg" alt="Boissons" fill className="object-cover transition-transform duration-700 group-hover:scale-110"/>
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-3xl font-serif font-bold">Boissons</h3>
                 </div>
              </div>
              <div className="p-8">
                 <ul className="space-y-4 text-stone-300">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Bissap (Hibiscus)</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Jus de Passion</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Jus de Baobab</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>Gingembre naturel</li>
                 </ul>
                 <div className="mt-8 pt-6 border-t border-stone-700">
                    <p className="text-sm text-stone-400 italic">Rafraîchissement 100% naturel.</p>
                 </div>
              </div>
            </div>

            {/* 3. DOUCEURS (Liste complète avec image) */}
            <div className="bg-white text-stone-800 rounded-3xl p-0 shadow-xl hover:-translate-y-2 transition-transform duration-500 overflow-hidden group">
              <div className="h-48 relative">
                 <Image src="/images/6.jpeg" alt="Douceurs" fill className="object-cover transition-transform duration-700 group-hover:scale-110"/>
                 <div className="absolute inset-0 bg-orange-900/20 flex items-center justify-center">
                    <h3 className="text-3xl font-serif font-bold text-white drop-shadow-md">Douceurs</h3>
                 </div>
              </div>
              <div className="p-8">
                 <ul className="space-y-4 text-stone-600">
                    <li className="flex items-center gap-3"><Star size={16} className="text-orange-500"/> Torfi</li>
                    <li className="flex items-center gap-3"><Star size={16} className="text-orange-500"/> Caramel ivoirien</li>
                    <li className="flex items-center gap-3"><Star size={16} className="text-orange-500"/> Galette aller-retour</li>
                    <li className="flex items-center gap-3"><Star size={16} className="text-orange-500"/> Beignets africains</li>
                    <li className="flex items-center gap-3"><Star size={16} className="text-orange-500"/> Croquettes</li>
                 </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- NOTRE HISTOIRE (Contenu riche) --- */}
      <section id="histoire" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-stone-100">
            
            <div className="grid grid-cols-2 gap-4 h-full">
               <div className="relative h-64 rounded-2xl overflow-hidden"><Image src="/images/7.jpeg" alt="Histoire" fill className="object-cover hover:scale-105 transition-transform duration-500" /></div>
               <div className="relative h-64 rounded-2xl overflow-hidden mt-8"><Image src="/images/8.jpeg" alt="Valeurs" fill className="object-cover hover:scale-105 transition-transform duration-500" /></div>
            </div>

            <div>
              <span className="text-green-800 font-bold uppercase tracking-wider text-sm mb-2 block">À Propos</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">Notre Histoire</h2>
              <div className="text-stone-600 mb-8 leading-relaxed space-y-4">
                <p>
                  Alièfè Traiteur est née de la passion pour la gastronomie ivoirienne et le partage culinaire. Installée au Maroc, elle a pour mission de faire découvrir les saveurs authentiques de la Côte d’Ivoire à travers des plats préparés avec soin, des produits frais et un savoir-faire traditionnel.
                </p>
                <p>
                  Chaque événement – mariage, anniversaire ou séminaire – devient un moment convivial et inoubliable, où vos invités voyagent au cœur des saveurs ivoiriennes… comme s’ils étaient au pays.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 border-t border-stone-100 pt-6">
                <div>
                  <h4 className="font-bold text-orange-600 mb-1">Mission</h4>
                  <p className="text-sm text-stone-500">Expérience culinaire authentique et élégante.</p>
                </div>
                <div>
                  <h4 className="font-bold text-orange-600 mb-1">Vision</h4>
                  <p className="text-sm text-stone-500">Devenir une référence du traiteur ivoirien moderne.</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-bold text-stone-800 mb-2">Nos Valeurs</h4>
                <div className="flex flex-wrap gap-2">
                  {['Authenticité', 'Qualité', 'Respect', 'Satisfaction client'].map(v => (
                    <span key={v} className="bg-stone-100 px-3 py-1.5 rounded-full text-xs font-bold text-stone-600 uppercase tracking-wide">{v}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TARIFS & PACKAGES --- */}
      <section id="tarifs" className="py-24 bg-stone-100">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 text-stone-800">Nos Packages</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
                {/* Anniversaire */}
                <div className="bg-white p-8 rounded-3xl border border-stone-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 group flex flex-col">
                    <div className="text-stone-400 text-sm font-bold uppercase tracking-wider mb-2">Anniversaire</div>
                    <div className="text-4xl font-serif font-bold text-stone-800 mb-2">350€<span className="text-lg font-sans font-normal text-stone-400">/dès</span></div>
                    <ul className="space-y-4 mb-8 flex-grow mt-6">
                        <li className="flex gap-3 items-start text-stone-600"><Check className="text-green-600 flex-shrink-0" size={18}/> Buffet simplifié</li>
                        <li className="flex gap-3 items-start text-stone-600"><Check className="text-green-600 flex-shrink-0" size={18}/> Options sucrées/salées</li>
                    </ul>
                    <a href="#contact" className="block w-full py-3 rounded-xl border-2 border-stone-100 text-center font-bold text-stone-600 group-hover:bg-stone-800 group-hover:text-white transition-all">Choisir</a>
                </div>

                {/* Mariage */}
                <div className="bg-green-900 p-8 rounded-3xl shadow-2xl relative transform md:-translate-y-6 md:scale-105 border border-green-800 flex flex-col">
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl shadow-lg">POPULAIRE</div>
                    <div className="text-green-200 text-sm font-bold uppercase tracking-wider mb-2">Mariage</div>
                    <div className="text-5xl font-serif font-bold text-white mb-2">1500€<span className="text-lg font-sans font-normal text-green-200">/dès</span></div>
                    <ul className="space-y-4 mb-8 text-green-50 flex-grow mt-6">
                        <li className="flex gap-3 items-start"><Check className="text-orange-400 flex-shrink-0" size={18}/> Entrées raffinées</li>
                        <li className="flex gap-3 items-start"><Check className="text-orange-400 flex-shrink-0" size={18}/> Plats principaux généreux</li>
                        <li className="flex gap-3 items-start"><Check className="text-orange-400 flex-shrink-0" size={18}/> Accompagnements variés</li>
                        <li className="flex gap-3 items-start"><Check className="text-orange-400 flex-shrink-0" size={18}/> Desserts gourmands</li>
                    </ul>
                    <a href="#contact" className="block w-full py-4 rounded-xl bg-white text-green-900 text-center font-bold hover:bg-orange-500 hover:text-white transition-colors shadow-lg">Demander un devis</a>
                </div>

                {/* Entreprise */}
                <div className="bg-white p-8 rounded-3xl border border-stone-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 group flex flex-col">
                    <div className="text-stone-400 text-sm font-bold uppercase tracking-wider mb-2">Entreprise</div>
                    <div className="text-4xl font-serif font-bold text-stone-800 mb-2">300€<span className="text-lg font-sans font-normal text-stone-400">/dès</span></div>
                    <ul className="space-y-4 mb-8 flex-grow mt-6">
                        <li className="flex gap-3 items-start text-stone-600"><Check className="text-green-600 flex-shrink-0" size={18}/> Cocktail dînatoire</li>
                        <li className="flex gap-3 items-start text-stone-600"><Check className="text-green-600 flex-shrink-0" size={18}/> Pause café africaine</li>
                        <li className="flex gap-3 items-start text-stone-600"><Check className="text-green-600 flex-shrink-0" size={18}/> Service séminaire</li>
                    </ul>
                    <a href="#contact" className="block w-full py-3 rounded-xl border-2 border-stone-100 text-center font-bold text-stone-600 group-hover:bg-stone-800 group-hover:text-white transition-all">Choisir</a>
                </div>
            </div>
        </div>
      </section>

      {/* --- GALERIE PHOTO --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
           <h2 className="text-3xl font-serif font-bold text-center mb-12">Galerie Photos</h2>
           <div className="columns-2 md:columns-4 gap-4 space-y-4">
             {[9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => (
                 <div key={num} className="relative rounded-xl overflow-hidden group break-inside-avoid">
                     <div className={`relative w-full ${num % 2 === 0 ? 'aspect-square' : 'aspect-[3/4]'}`}>
                       <Image 
                           src={`/images/${num}.jpeg`} 
                           alt={`Galerie ${num}`} 
                           fill 
                           className="object-cover transition-transform duration-700 group-hover:scale-110" 
                       />
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                     </div>
                 </div>
             ))}
           </div>
        </div>
      </section>

      {/* --- FOOTER & CONTACT --- */}
      <section id="contact" className="bg-stone-900 text-white py-24 rounded-t-[3rem] -mt-10 relative z-20">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
              
              <div className="space-y-8">
                  <h2 className="text-5xl font-serif font-bold leading-tight">Parlons de <br/><span className="text-orange-500">votre projet.</span></h2>
                  <p className="text-stone-300 text-lg font-light">
                      Remplissez le formulaire ci-contre pour recevoir un menu sur mesure pour votre événement !
                  </p>
                  
                  <div className="space-y-6 pt-8">
                      <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-orange-500"><Phone size={24}/></div>
                          <div>
                              <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Téléphone</p>
                              <p className="text-2xl font-bold">06 32 47 84 96</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-green-500"><Mail size={24}/></div>
                          <div>
                              <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Email</p>
                              <p className="text-xl">landryparfaitkouame@gmail.com</p>
                          </div>
                      </div>
                  </div>
                  
                  <div className="pt-8 border-t border-white/10">
                      <p className="mb-4 font-bold text-stone-400">Suivez-nous</p>
                      <div className="flex gap-4">
                          <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-orange-600 transition-colors">
                            <Instagram size={18}/> <span className="text-sm">A_lièfê_traiteur</span>
                          </a>
                          <a href="#" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-blue-600 transition-colors">
                            <Facebook size={18}/> <span className="text-sm">Alièfê traiteur</span>
                          </a>
                      </div>
                  </div>
              </div>

              {/* Formulaire Fonctionnel avec succès personnalisé */}
              <div className="bg-white text-stone-900 p-8 md:p-10 rounded-[2rem] shadow-2xl">
                  {submitStatus === 'success' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fade-up">
                      <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-green-600 rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
                        <Check size={48} />
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-orange-600">Akwaba ! 🇨🇮</h3>
                      <p className="text-xl font-bold text-green-800">Votre demande est bien reçue.</p>
                      <p className="text-stone-600">
                        Vérifiez votre boîte mail, une confirmation vous attend.<br/>
                        L'équipe Alièfè vous recontactera sous 24h.
                      </p>
                      <button onClick={() => setSubmitStatus('idle')} className="mt-8 px-6 py-2 bg-stone-100 rounded-full text-stone-600 font-bold hover:bg-orange-100 hover:text-orange-600 transition-colors">
                        Envoyer une autre demande
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Nom</label>
                                <input {...register("user_name", { required: true })} type="text" className="w-full bg-stone-100 border border-transparent focus:border-orange-500 rounded-lg py-3 px-4 focus:ring-0 outline-none transition-all" placeholder="Votre nom" />
                                {errors.user_name && <span className="text-xs text-red-500">Requis</span>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Email</label>
                                <input {...register("user_email", { required: true })} type="email" className="w-full bg-stone-100 border border-transparent focus:border-orange-500 rounded-lg py-3 px-4 focus:ring-0 outline-none transition-all" placeholder="votre@email.com" />
                                {errors.user_email && <span className="text-xs text-red-500">Requis</span>}
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Téléphone</label>
                                <input {...register("user_phone", { required: true })} type="tel" className="w-full bg-stone-100 border border-transparent focus:border-orange-500 rounded-lg py-3 px-4 focus:ring-0 outline-none transition-all" placeholder="07 XX XX XX XX"/>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Invités</label>
                                <input {...register("guest_count")} type="number" className="w-full bg-stone-100 border border-transparent focus:border-orange-500 rounded-lg py-3 px-4 focus:ring-0 outline-none transition-all" placeholder="50"/>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Type d'événement</label>
                            <select {...register("event_type")} className="w-full bg-stone-100 border border-transparent focus:border-orange-500 rounded-lg py-3 px-4 focus:ring-0 outline-none transition-all cursor-pointer">
                                <option>Mariage</option>
                                <option>Anniversaire</option>
                                <option>Baptême</option>
                                <option>Entreprise</option>
                                <option>Autre</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Plats ou boissons préférés</label>
                            <input {...register("preferences")} type="text" className="w-full bg-stone-100 border border-transparent focus:border-orange-500 rounded-lg py-3 px-4 focus:ring-0 outline-none transition-all" placeholder="Ex: Beaucoup d'Aloco..." />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Commentaires</label>
                            <textarea {...register("message")} rows={3} className="w-full bg-stone-100 border border-transparent focus:border-orange-500 rounded-lg py-3 px-4 focus:ring-0 outline-none transition-all" placeholder="Détails supplémentaires..."></textarea>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full bg-green-900 text-white font-bold py-4 rounded-xl hover:bg-green-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                          {isSubmitting ? (<><Loader2 className="animate-spin" /> Envoi en cours...</>) : "Envoyer ma demande"}
                        </button>
                        
                        {submitStatus === 'error' && (
                          <p className="text-red-500 text-sm text-center font-bold">Oups, une erreur est survenue. Vérifiez votre connexion.</p>
                        )}
                    </form>
                  )}
              </div>
          </div>
          <div className="text-center text-stone-500 text-sm mt-20 border-t border-white/5 pt-8">
              © 2026 Alièfè Traiteur • L'Excellence Ivoirienne au Maroc.
          </div>
      </section>

    </main>
  );
}