'use strict';

const THEME_STORAGE_KEY = "asia-this-way-theme";
const LANGUAGE_STORAGE_KEY = "asia-this-way-language";
const SUPPORTED_LANGUAGES = ["en", "fr", "ar"];

let currentTheme = "light";
let currentLanguage = "en";

const languageSwitchers = Array.from(document.querySelectorAll("[data-language-switcher]"));
const themeToggleButtons = Array.from(document.querySelectorAll("[data-theme-toggle]"));

const translatableNodes = [];
const originalNodeText = new WeakMap();

const languageDictionaries = {
  fr: {
    "Language selector": "Selecteur de langue",
    "home": "accueil",
    "about us": "a propos",
    "destination": "destinations",
    "packages": "circuits",
    "gallery": "galerie",
    "contact us": "contact",
    "Book Now": "Reserver",
    "Signature Group Journeys Across Asia": "Voyages de groupe signatures a travers l'Asie",
    "Travel Asia with quiet luxury and curated rhythm.": "Voyagez en Asie avec un luxe discret et un rythme soigneusement concu.",
    "Asia This Way blends refined hotels, effortless logistics, and immersive moments into elegant departures for travellers who value comfort and beauty.": "Asia This Way combine des hotels raffines, une logistique fluide et des experiences immersives dans des departs elegants pour les voyageurs qui recherchent confort et beaute.",
    "Explore Packages": "Explorer les circuits",
    "Speak With Us": "Parlez avec nous",
    "Why travellers choose us": "Pourquoi les voyageurs nous choisissent",
    "Thoughtful itineraries with a boutique feel.": "Des itineraires soignes avec une touche boutique.",
    "Handpicked stays": "Sejours soigneusement selectionnes",
    "Resorts, city escapes, and scenic retreats chosen for atmosphere and comfort.": "Resorts, echappees urbaines et retraites panoramiques choisis pour leur ambiance et leur confort.",
    "Elegant pacing": "Rythme elegant",
    "Balanced itineraries with highlights and enough time to slow down.": "Des itineraires equilibres avec les incontournables et suffisamment de temps pour ralentir.",
    "Seamless guidance": "Accompagnement fluide",
    "Direct support from first inquiry to final departure.": "Un accompagnement direct de la premiere demande jusqu'au depart final.",
    "2026 tours": "circuits 2026",
    "small groups": "petits groupes",
    "curated stays": "sejours selectionnes",
    "Concierge-level planning": "Planification niveau conciergerie",
    "Every departure is shaped for comfort, clear logistics, and a polished end-to-end experience.": "Chaque depart est concu pour le confort, une logistique claire et une experience soignee de bout en bout.",
    "Boutique travel tone": "Esprit voyage boutique",
    "We combine iconic destinations with hotels, scenery, and moments that feel visually memorable.": "Nous combinons destinations iconiques, hotels, paysages et moments visuellement memorables.",
    "Designed for ease": "Concu pour la simplicite",
    "Travellers enjoy group energy without sacrificing rhythm, space, or a sense of refinement.": "Les voyageurs profitent de l'energie du groupe sans sacrifier le rythme, l'espace ni le raffinement.",
    "Destinations": "Destinations",
    "Places chosen for atmosphere, beauty, and ease.": "Des lieux choisis pour l'ambiance, la beaute et la serenite.",
    "From island stillness to cosmopolitan nights, every stop is selected to feel elevated from arrival to return.": "Du calme des iles aux nuits cosmopolites, chaque etape est choisie pour offrir une experience elevee du debut a la fin.",
    "Golden escape": "Evasion doree",
    "Modern calm": "Calme moderne",
    "Island luxury": "Luxe insulaire",
    "Tropical discovery": "Decouverte tropicale",
    "Urban glamour": "Glamour urbain",
    "Heritage coast": "Cote patrimoniale",
    "Lantern nights": "Nuits de lanternes",
    "Temple grandeur, rooftop glamour, and island indulgence in one destination.": "Grandeur des temples, glamour des rooftops et douceur insulaire dans une seule destination.",
    "Polished city breaks, rich culture, and nature-driven retreats with ease.": "Escapades urbaines soignees, culture riche et retraites nature en toute fluidite.",
    "Overwater privacy, luminous lagoons, and a sense of total escape.": "Intimite sur l'eau, lagons lumineux et sensation d'evasion totale.",
    "Secluded beaches, island-hopping, and dramatic coastal scenery.": "Plages isolees, exploration d'iles et paysages cotiers spectaculaires.",
    "Skyline drama, design-led stays, and one of Asia's sharpest city rhythms.": "Skyline spectaculaire, sejours design et l'un des rythmes urbains les plus vibrants d'Asie.",
    "Tea country, ocean light, and cultural depth wrapped in warm hospitality.": "Plantations de the, lumiere oceanique et richesse culturelle accompagnees d'une hospitalite chaleureuse.",
    "Refined cuisine, coastal elegance, and cities filled with contrast and charm.": "Cuisine raffinee, elegance cotiere et villes pleines de contrastes et de charme.",
    "More Destinations": "Plus de destinations",
    "Show Fewer Destinations": "Voir moins de destinations",
    "Departure Calendar": "Calendrier des departs",
    "Signature group tours with premium pacing.": "Circuits de groupe signatures au rythme premium.",
    "Our 2026 departures are designed for travellers who want structure without feeling rushed, with curated stays, smooth logistics, and a refined group atmosphere.": "Nos departs 2026 sont concus pour les voyageurs qui veulent une structure sans precipitation, avec des sejours choisis, une logistique fluide et une ambiance de groupe raffinee.",
    "Featured departure": "Depart a l'honneur",
    "Spring 2026": "Printemps 2026",
    "Limited seats": "Places limitees",
    "View Itinerary": "Voir l'itineraire",
    "View All Departures": "Voir tous les departs",
    "Show Fewer Departures": "Voir moins de departs",
    "Summer departure": "Depart d'ete",
    "Coming soon": "Bientot disponible",
    "Request Details": "Demander les details",
    "Late July 2026": "Fin juillet 2026",
    "August departure": "Depart d'aout",
    "August 2026": "Aout 2026",
    "Island departure": "Depart insulaire",
    "Late August 2026": "Fin aout 2026",
    "Autumn departure": "Depart d'automne",
    "October 2026": "Octobre 2026",
    "A tropical escape balancing overwater serenity in the Maldives with cultural texture in Sri Lanka.": "Une evasion tropicale qui equilibre la serenite des Maldives avec la richesse culturelle du Sri Lanka.",
    "Vietnam and Thailand brought together through culture, coastlines, and iconic city moments.": "Vietnam et Thailande reunis a travers culture, cotes et moments urbains iconiques.",
    "A dynamic route that blends Hong Kong energy with Vietnam's cultural highlights and coastal rhythm.": "Un itineraire dynamique qui melange l'energie de Hong Kong avec les points forts culturels et cotiers du Vietnam.",
    "A diverse itinerary blending modern cities, tropical islands, and heritage-rich experiences.": "Un itineraire varie melant villes modernes, iles tropicales et experiences patrimoniales.",
    "A classic Southeast Asia itinerary with temple culture, city energy, and shoreline downtime.": "Un itineraire classique d'Asie du Sud-Est entre culture des temples, energie urbaine et detente en bord de mer.",
    "An island-focused departure featuring Malaysia, Indonesia, and Thailand through a resort-led lens.": "Un depart axe sur les iles incluant Malaisie, Indonesie et Thailande avec une approche resort.",
    "A well-balanced route combining city energy, cultural stops, and lighter moments by the coast.": "Un parcours equilibre combinant energie urbaine, etapes culturelles et moments plus calmes en bord de mer.",
    "A relaxing finale to the season with paradise islands, cultural richness, and warm coastal light.": "Une finale de saison relaxante avec iles paradisiaques, richesse culturelle et douce lumiere cotiere.",
    "Travel Diary": "Carnet de voyage",
    "The kind of moments that linger.": "Des moments qui restent en memoire.",
    "A preview of the coastlines, textures, and city scenes our travellers return home talking about.": "Un apercu des cotes, textures et scenes urbaines dont nos voyageurs parlent encore au retour.",
    "Quiet shorelines": "Rivages paisibles",
    "Slow mornings, soft light, and room to breathe.": "Matins lents, lumiere douce et espace pour respirer.",
    "Tropical calm": "Calme tropical",
    "Scenery that feels cinematic without trying too hard.": "Des paysages cinematographiques sans artifices.",
    "Elevated moments": "Moments d'exception",
    "Travel designed to feel effortless, polished, and memorable.": "Un voyage pense pour etre fluide, soigne et memorable.",
    "Golden evenings": "Soirees dorees",
    "The hours that turn a beautiful trip into a vivid memory.": "Des instants qui transforment un beau voyage en souvenir marquant.",
    "City textures": "Textures urbaines",
    "Architecture, detail, and atmosphere layered into every stop.": "Architecture, details et ambiance a chaque etape.",
    "Plan Your Escape": "Planifiez votre echappee",
    "Ready for a more elevated way to travel Asia?": "Pret pour une facon plus elegante de voyager en Asie ?",
    "Tell us the departure, atmosphere, and pace you want. We will guide you toward the itinerary that fits your style.": "Indiquez-nous le depart, l'ambiance et le rythme souhaites. Nous vous orienterons vers l'itineraire adapte a votre style.",
    "Curated small-group departures": "Departs en petits groupes soigneusement choisis",
    "Refined hotels and smooth logistics": "Hotels raffines et logistique fluide",
    "Direct support before and during travel": "Accompagnement direct avant et pendant le voyage",
    "Call Us": "Appelez-nous",
    "Email Us": "Ecrivez-nous",
    "Available from anywhere for departures across Asia.": "Disponibles depuis n'importe où pour des departs a travers l'Asie.",
    "Contact Us": "Contactez-nous",
    "Curated Asia departures for travellers who want beauty, comfort, and seamless planning.": "Departs en Asie soigneusement concus pour les voyageurs en quete de beaute, de confort et d'une organisation fluide.",
    "Tell us your preferred dates and atmosphere, and we will help you choose the right departure.": "Donnez-nous vos dates preferees et l'ambiance recherchee, et nous vous aiderons a choisir le depart ideal.",
    "Privacy Policy": "Politique de confidentialite",
    "Terms & Conditions": "Termes et conditions",
    "FAQ": "FAQ",
    "Back To Packages": "Retour aux circuits",
    "Group G0 Departure": "Depart du groupe G0",
    "Maldives and Sri Lanka": "Maldives et Sri Lanka",
    "A premium 11-day journey balancing island relaxation in the Maldives with cultural depth across Sri Lanka. Designed for travellers who want comfort, style, and smooth pacing.": "Un voyage premium de 11 jours combinant la detente insulaire aux Maldives et la richesse culturelle du Sri Lanka. Concu pour les voyageurs recherchant confort, style et rythme fluide.",
    "Curated Group Tour": "Circuit de groupe soigneusement concu",
    "Reserve Your Spot": "Reservez votre place",
    "See Included Experiences": "Voir les experiences incluses",
    "Full route schedule for Group G0 across Maldives and Sri Lanka.": "Programme complet de l'itineraire du groupe G0 entre Maldives et Sri Lanka.",
    "Travel Days": "Jours de voyage",
    "Hotel Areas": "Zones hotelieres",
    "Island + Culture": "Iles + Culture",
    "Balanced Pace": "Rythme equilibre",
    "Small Group": "Petit groupe",
    "Premium Feel": "Ambiance premium",
    "Accommodation": "Hebergement",
    "Selected Hotels": "Hotels selectionnes",
    "Handpicked stays chosen for atmosphere, comfort, and location quality throughout the journey.": "Des sejours choisis pour leur ambiance, leur confort et la qualite de leur emplacement tout au long du voyage.",
    "Beachfront luxury, calm lagoons, and a soft-island atmosphere to begin your journey.": "Luxe en bord de mer, lagons paisibles et atmosphere insulaire douce pour commencer votre voyage.",
    "View Hotel": "Voir l'hotel",
    "A peaceful base close to heritage landmarks including Sigiriya and cave temples.": "Un point de chute paisible proche des sites patrimoniaux, dont Sigiriya et les temples rupestres.",
    "A modern city stay near shopping, dining, and ocean-facing avenues in Colombo.": "Un sejour urbain moderne pres des boutiques, restaurants et avenues en bord de mer a Colombo.",
    "Experiences": "Experiences",
    "Included Highlights": "Moments inclus",
    "Open any image to view it in full. These moments shape the atmosphere of the full departure.": "Ouvrez n'importe quelle image pour l'afficher en grand. Ces moments definissent l'atmosphere du depart complet.",
    "Island Leisure": "Detente insulaire",
    "Booking": "Reservation",
    "Ready To Join Group G0?": "Pret a rejoindre le groupe G0 ?",
    "Contact our travel desk to confirm availability, ask for payment steps, and reserve your seat.": "Contactez notre travel desk pour confirmer la disponibilite, connaitre les etapes de paiement et reserver votre place.",
    "Contact To Book": "Contacter pour reserver",
    "Email Travel Desk": "Ecrire au travel desk",
    "Asia This Way | Group G0 Maldives and Sri Lanka | 2026 Departure": "Asia This Way | Groupe G0 Maldives et Sri Lanka | Depart 2026"
  },

  ar: {
    "Language selector": "اختيار اللغة",
    "home": "الرئيسية",
    "about us": "من نحن",
    "destination": "الوجهات",
    "packages": "الباقات",
    "gallery": "المعرض",
    "contact us": "اتصل بنا",
    "Book Now": "احجز الان",
    "Signature Group Journeys Across Asia": "رحلات جماعية مميزة عبر اسيا",
    "Travel Asia with quiet luxury and curated rhythm.": "سافر في اسيا بفخامة هادئة وايقاع مدروس.",
    "Asia This Way blends refined hotels, effortless logistics, and immersive moments into elegant departures for travellers who value comfort and beauty.": "تجمع Asia This Way بين فنادق راقية وتنظيم سلس وتجارب غامرة ضمن رحلات انيقة للمسافرين الذين يقدرون الراحة والجمال.",
    "Explore Packages": "اكتشف الباقات",
    "Speak With Us": "تحدث معنا",
    "Why travellers choose us": "لماذا يختارنا المسافرون",
    "Thoughtful itineraries with a boutique feel.": "برامج مدروسة بطابع بوتيكي.",
    "Handpicked stays": "اقامات مختارة بعناية",
    "Resorts, city escapes, and scenic retreats chosen for atmosphere and comfort.": "منتجعات واقامات مدنية وملاذات طبيعية مختارة للاجواء والراحة.",
    "Elegant pacing": "ايقاع انيق",
    "Balanced itineraries with highlights and enough time to slow down.": "مسارات متوازنة تجمع بين ابرز المحطات ووقت كاف للاسترخاء.",
    "Seamless guidance": "ارشاد سلس",
    "Direct support from first inquiry to final departure.": "دعم مباشر من اول استفسار حتى موعد الانطلاق.",
    "2026 tours": "رحلات 2026",
    "small groups": "مجموعات صغيرة",
    "curated stays": "اقامات مختارة",
    "Concierge-level planning": "تخطيط بمستوى كونسيرج",
    "Every departure is shaped for comfort, clear logistics, and a polished end-to-end experience.": "كل رحلة مصممة للراحة والتنظيم الواضح وتجربة متقنة من البداية للنهاية.",
    "Boutique travel tone": "طابع سفر بوتيكي",
    "We combine iconic destinations with hotels, scenery, and moments that feel visually memorable.": "نمزج بين وجهات ايقونية وفنادق ومناظر وتجارب تبقى في الذاكرة بصريا.",
    "Designed for ease": "مصمم للسهولة",
    "Travellers enjoy group energy without sacrificing rhythm, space, or a sense of refinement.": "يستمتع المسافرون بطاقة المجموعة دون التضحية بالايقاع او المساحة او الاحساس بالرقي.",
    "Destinations": "الوجهات",
    "Places chosen for atmosphere, beauty, and ease.": "اماكن مختارة للاجواء والجمال والراحة.",
    "From island stillness to cosmopolitan nights, every stop is selected to feel elevated from arrival to return.": "من هدوء الجزر الى ليالي المدن النابضة، كل محطة مختارة لتمنحك تجربة راقية من الوصول حتى العودة.",
    "Golden escape": "هروب ذهبي",
    "Modern calm": "هدوء عصري",
    "Island luxury": "رفاهية الجزر",
    "Tropical discovery": "اكتشاف استوائي",
    "Urban glamour": "سحر حضري",
    "Heritage coast": "ساحل تراثي",
    "Lantern nights": "ليالي الفوانيس",
    "Temple grandeur, rooftop glamour, and island indulgence in one destination.": "عظمة المعابد وسحر الاسطح ومتعة الجزر في وجهة واحدة.",
    "Polished city breaks, rich culture, and nature-driven retreats with ease.": "عطلات مدنية راقية وثقافة غنية وملاذات طبيعية بتنظيم سلس.",
    "Overwater privacy, luminous lagoons, and a sense of total escape.": "خصوصية فوق الماء وبحيرات مضيئة واحساس كامل بالهروب.",
    "Secluded beaches, island-hopping, and dramatic coastal scenery.": "شواطئ هادئة وتنقل بين الجزر ومشاهد ساحلية خلابة.",
    "Skyline drama, design-led stays, and one of Asia's sharpest city rhythms.": "افق مدينة مبهر واقامات عصرية وايقاع حضري من اجمل ما في اسيا.",
    "Tea country, ocean light, and cultural depth wrapped in warm hospitality.": "مرتفعات الشاي وضوء البحر وعمق ثقافي ضمن ضيافة دافئة.",
    "Refined cuisine, coastal elegance, and cities filled with contrast and charm.": "مطبخ راق واناقة ساحلية ومدن مليئة بالتباين والسحر.",
    "More Destinations": "وجهات اكثر",
    "Show Fewer Destinations": "عرض وجهات اقل",
    "Departure Calendar": "جدول الانطلاق",
    "Signature group tours with premium pacing.": "رحلات جماعية مميزة بايقاع راق.",
    "Our 2026 departures are designed for travellers who want structure without feeling rushed, with curated stays, smooth logistics, and a refined group atmosphere.": "رحلات 2026 مصممة لمن يريد برنامجا منظما دون استعجال، مع اقامات مختارة وتنظيم سلس واجواء مجموعة راقية.",
    "Featured departure": "رحلة مميزة",
    "Spring 2026": "ربيع 2026",
    "Limited seats": "مقاعد محدودة",
    "View Itinerary": "عرض البرنامج",
    "View All Departures": "عرض كل الرحلات",
    "Show Fewer Departures": "عرض رحلات اقل",
    "Summer departure": "رحلة صيفية",
    "Coming soon": "قريبا",
    "Request Details": "اطلب التفاصيل",
    "Late July 2026": "اواخر يوليو 2026",
    "August departure": "رحلة اغسطس",
    "August 2026": "اغسطس 2026",
    "Island departure": "رحلة جزر",
    "Late August 2026": "اواخر اغسطس 2026",
    "Autumn departure": "رحلة خريفية",
    "October 2026": "اكتوبر 2026",
    "A tropical escape balancing overwater serenity in the Maldives with cultural texture in Sri Lanka.": "رحلة استوائية توازن بين هدوء المالديف فوق الماء وثراء الثقافة في سريلانكا.",
    "Vietnam and Thailand brought together through culture, coastlines, and iconic city moments.": "فيتنام وتايلاند معا عبر الثقافة والسواحل ولحظات مدنية ايقونية.",
    "A dynamic route that blends Hong Kong energy with Vietnam's cultural highlights and coastal rhythm.": "مسار حيوي يجمع طاقة هونغ كونغ مع ابرز معالم فيتنام الثقافية والساحلية.",
    "A diverse itinerary blending modern cities, tropical islands, and heritage-rich experiences.": "برنامج متنوع يمزج بين المدن الحديثة والجزر الاستوائية وتجارب غنية بالتراث.",
    "A classic Southeast Asia itinerary with temple culture, city energy, and shoreline downtime.": "برنامج كلاسيكي في جنوب شرق اسيا يجمع ثقافة المعابد وحيوية المدن واسترخاء السواحل.",
    "An island-focused departure featuring Malaysia, Indonesia, and Thailand through a resort-led lens.": "رحلة تركز على الجزر وتشمل ماليزيا واندونيسيا وتايلاند بطابع منتجعي.",
    "A well-balanced route combining city energy, cultural stops, and lighter moments by the coast.": "مسار متوازن يجمع بين طاقة المدن والمحطات الثقافية ولحظات هادئة على الساحل.",
    "A relaxing finale to the season with paradise islands, cultural richness, and warm coastal light.": "ختام مريح للموسم مع جزر خلابة وثراء ثقافي واضواء ساحلية دافئة.",
    "Travel Diary": "يوميات السفر",
    "The kind of moments that linger.": "لحظات تبقى في الذاكرة.",
    "A preview of the coastlines, textures, and city scenes our travellers return home talking about.": "لمحة عن السواحل والتفاصيل ومشاهد المدن التي يعود مسافرونا للحديث عنها.",
    "Quiet shorelines": "سواحل هادئة",
    "Slow mornings, soft light, and room to breathe.": "صباحات هادئة وضوء ناعم ومساحة للتنفس.",
    "Tropical calm": "هدوء استوائي",
    "Scenery that feels cinematic without trying too hard.": "مشاهد تبدو سينمائية بطبيعية.",
    "Elevated moments": "لحظات راقية",
    "Travel designed to feel effortless, polished, and memorable.": "سفر مصمم ليكون سهلا وانيقا ولا ينسى.",
    "Golden evenings": "امسيات ذهبية",
    "The hours that turn a beautiful trip into a vivid memory.": "ساعات تحول الرحلة الجميلة الى ذكرى حية.",
    "City textures": "تفاصيل المدينة",
    "Architecture, detail, and atmosphere layered into every stop.": "عمارة وتفاصيل واجواء حاضرة في كل محطة.",
    "Plan Your Escape": "خطط لهروبك",
    "Ready for a more elevated way to travel Asia?": "هل انت مستعد لطريقة ارقى للسفر في اسيا؟",
    "Tell us the departure, atmosphere, and pace you want. We will guide you toward the itinerary that fits your style.": "اخبرنا بتاريخ الانطلاق والاجواء والايقاع الذي تريده، وسنرشدك للبرنامج المناسب لذوقك.",
    "Curated small-group departures": "رحلات مجموعات صغيرة مختارة",
    "Refined hotels and smooth logistics": "فنادق راقية وتنظيم سلس",
    "Direct support before and during travel": "دعم مباشر قبل الرحلة واثناءها",
    "Call Us": "اتصل بنا",
    "Email Us": "راسلنا",
    "Available from anywhere for departures across Asia.": "متاحون من أي مكان لرحلات عبر اسيا.",
    "Contact Us": "اتصل بنا",
    "Curated Asia departures for travellers who want beauty, comfort, and seamless planning.": "رحلات اسيوية مختارة للمسافرين الباحثين عن الجمال والراحة والتنظيم السلس.",
    "Tell us your preferred dates and atmosphere, and we will help you choose the right departure.": "اخبرنا بالتواريخ والاجواء المفضلة لديك وسنساعدك في اختيار الرحلة المناسبة.",
    "Privacy Policy": "سياسة الخصوصية",
    "Terms & Conditions": "الشروط والاحكام",
    "FAQ": "الاسئلة الشائعة",
    "Back To Packages": "العودة الى الباقات",
    "Group G0 Departure": "انطلاق مجموعة G0",
    "Maldives and Sri Lanka": "المالديف وسريلانكا",
    "A premium 11-day journey balancing island relaxation in the Maldives with cultural depth across Sri Lanka. Designed for travellers who want comfort, style, and smooth pacing.": "رحلة فاخرة لمدة 11 يوما تجمع بين استرخاء جزر المالديف وعمق الثقافة في سريلانكا. صممت للمسافرين الباحثين عن الراحة والاناقة والايقاع السلس.",
    "Curated Group Tour": "رحلة جماعية مختارة",
    "Reserve Your Spot": "احجز مكانك",
    "See Included Experiences": "شاهد التجارب المشمولة",
    "Full route schedule for Group G0 across Maldives and Sri Lanka.": "البرنامج الكامل لمسار مجموعة G0 بين المالديف وسريلانكا.",
    "Travel Days": "ايام السفر",
    "Hotel Areas": "مناطق الاقامة",
    "Island + Culture": "جزر + ثقافة",
    "Balanced Pace": "ايقاع متوازن",
    "Small Group": "مجموعة صغيرة",
    "Premium Feel": "طابع فاخر",
    "Accommodation": "الاقامة",
    "Selected Hotels": "الفنادق المختارة",
    "Handpicked stays chosen for atmosphere, comfort, and location quality throughout the journey.": "اقامات مختارة بعناية للاجواء والراحة وجودة الموقع طوال الرحلة.",
    "Beachfront luxury, calm lagoons, and a soft-island atmosphere to begin your journey.": "رفاهية على الشاطئ وبحيرات هادئة واجواء جزيرية ناعمة لبداية الرحلة.",
    "View Hotel": "عرض الفندق",
    "A peaceful base close to heritage landmarks including Sigiriya and cave temples.": "اقامة هادئة قريبة من المعالم التراثية مثل سيجيريا ومعابد الكهوف.",
    "A modern city stay near shopping, dining, and ocean-facing avenues in Colombo.": "اقامة حضرية حديثة قرب التسوق والمطاعم والشوارع المطلة على البحر في كولومبو.",
    "Experiences": "التجارب",
    "Included Highlights": "ابرز ما هو مشمول",
    "Open any image to view it in full. These moments shape the atmosphere of the full departure.": "افتح اي صورة لعرضها بالحجم الكامل. هذه اللحظات تصنع اجواء الرحلة كاملة.",
    "Island Leisure": "استجمام جزيري",
    "Booking": "الحجز",
    "Ready To Join Group G0?": "هل انت جاهز للانضمام الى مجموعة G0؟",
    "Contact our travel desk to confirm availability, ask for payment steps, and reserve your seat.": "تواصل مع مكتب السفر لتاكيد التوفر ومعرفة خطوات الدفع وحجز مقعدك.",
    "Contact To Book": "تواصل للحجز",
    "Email Travel Desk": "راسل مكتب السفر",
    "Asia This Way | Group G0 Maldives and Sri Lanka | 2026 Departure": "Asia This Way | مجموعة G0 المالديف وسريلانكا | انطلاق 2026"
  }
};

const themeButtonLabels = {
  light: {
    en: "Dark mode",
    fr: "Mode sombre",
    ar: "الوضع الداكن"
  },
  dark: {
    en: "Light mode",
    fr: "Mode clair",
    ar: "الوضع الفاتح"
  }
};

const themeToggleAria = {
  en: "Toggle color theme",
  fr: "Changer le theme de couleur",
  ar: "تبديل نمط الالوان"
};

const languageSelectorAria = {
  en: "Language selector",
  fr: "Selecteur de langue",
  ar: "اختيار اللغة"
};

const expandableSectionLabels = {
  viewAllDestBtn: {
    collapsed: {
      en: "More Destinations",
      fr: "Plus de destinations",
      ar: "وجهات اكثر"
    },
    expanded: {
      en: "Show Fewer Destinations",
      fr: "Voir moins de destinations",
      ar: "عرض وجهات اقل"
    }
  },
  viewAllBtn: {
    collapsed: {
      en: "View All Departures",
      fr: "Voir tous les departs",
      ar: "عرض كل الرحلات"
    },
    expanded: {
      en: "Show Fewer Departures",
      fr: "Voir moins de departs",
      ar: "عرض رحلات اقل"
    }
  }
};

const normalizeText = function (value) {
  return value.replace(/\s+/g, " ").trim();
};

const getStoredPreference = function (key, fallback) {
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch (error) {
    return fallback;
  }
};

const setStoredPreference = function (key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    /* Ignore storage errors in private mode or restricted contexts. */
  }
};

const initializeTranslatableNodes = function () {
  if (!document.body || translatableNodes.length) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.parentElement) return NodeFilter.FILTER_REJECT;
      if (node.parentElement.closest("script, style")) return NodeFilter.FILTER_REJECT;
      if (node.parentElement.hasAttribute("data-no-translate")) return NodeFilter.FILTER_REJECT;
      if (!normalizeText(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let node = walker.nextNode();

  while (node) {
    translatableNodes.push(node);
    originalNodeText.set(node, node.nodeValue);
    node = walker.nextNode();
  }
};

const translateDocument = function (language) {
  initializeTranslatableNodes();

  const dictionary = languageDictionaries[language] || {};

  translatableNodes.forEach(function (node) {
    const original = originalNodeText.get(node);

    if (!original) return;

    if (language === "en") {
      node.nodeValue = original;
      return;
    }

    const key = normalizeText(original);
    const translated = dictionary[key];

    if (!translated) {
      node.nodeValue = original;
      return;
    }

    const leading = (original.match(/^\s*/) || [""])[0];
    const trailing = (original.match(/\s*$/) || [""])[0];
    node.nodeValue = `${leading}${translated}${trailing}`;
  });
};

const getLocalizedLabel = function (labels) {
  return labels[currentLanguage] || labels.en;
};

const getExpandableLabel = function (buttonId, isExpanded) {
  const buttonLabels = expandableSectionLabels[buttonId];

  if (!buttonLabels) return "";

  const source = isExpanded ? buttonLabels.expanded : buttonLabels.collapsed;
  return source[currentLanguage] || source.en;
};

const refreshExpandableButtonLabels = function () {
  Object.keys(expandableSectionLabels).forEach(function (buttonId) {
    const button = document.getElementById(buttonId);

    if (!button) return;

    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const label = getExpandableLabel(buttonId, isExpanded);

    if (label) button.textContent = label;
  });
};

const updateThemeToggleButtons = function () {
  const labelMap = currentTheme === "dark" ? themeButtonLabels.dark : themeButtonLabels.light;
  const buttonLabel = getLocalizedLabel(labelMap);
  const buttonAria = getLocalizedLabel(themeToggleAria);

  themeToggleButtons.forEach(function (button) {
    const icon = button.querySelector("[data-theme-icon]");
    const text = button.querySelector("[data-theme-text]");

    if (icon) icon.setAttribute("name", currentTheme === "dark" ? "sunny-outline" : "moon-outline");
    if (text) text.textContent = buttonLabel;

    button.setAttribute("aria-label", buttonAria);
    button.setAttribute("title", buttonLabel);
  });
};

const updateLanguageSwitchers = function () {
  const ariaLabel = getLocalizedLabel(languageSelectorAria);

  languageSwitchers.forEach(function (switcher) {
    switcher.value = currentLanguage;
    switcher.setAttribute("aria-label", ariaLabel);
    switcher.setAttribute("title", ariaLabel);
  });
};

const applyTheme = function (theme, shouldPersist = true) {
  currentTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeToggleButtons();

  if (shouldPersist) {
    setStoredPreference(THEME_STORAGE_KEY, currentTheme);
  }
};

const applyLanguage = function (language, shouldPersist = true) {
  currentLanguage = SUPPORTED_LANGUAGES.includes(language) ? language : "en";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

  translateDocument(currentLanguage);
  updateLanguageSwitchers();
  updateThemeToggleButtons();
  refreshExpandableButtonLabels();

  if (shouldPersist) {
    setStoredPreference(LANGUAGE_STORAGE_KEY, currentLanguage);
  }
};

const initializeThemeAndLanguageControls = function () {
  const storedTheme = getStoredPreference(THEME_STORAGE_KEY, "light");
  const storedLanguage = getStoredPreference(LANGUAGE_STORAGE_KEY, "en");

  languageSwitchers.forEach(function (switcher) {
    switcher.addEventListener("change", function () {
      applyLanguage(this.value);
    });
  });

  themeToggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  });

  applyTheme(storedTheme, false);
  applyLanguage(storedLanguage, false);
};

initializeThemeAndLanguageControls();

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay].filter(Boolean);

const navToggleEvent = function (elements) {
  elements.forEach(function (element) {
    element.addEventListener("click", function () {
      if (!navbar || !overlay) return;

      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  });
};

navToggleEvent(navElemArr);
navToggleEvent(Array.from(navLinks));



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (!header || !goTopBtn) return;

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * expandable sections
 */

const toggleExpandableItems = function (buttonId, itemSelector, labels) {
  const button = document.getElementById(buttonId);
  const items = document.querySelectorAll(itemSelector);

  if (!button || !items.length) return;

  button.textContent = getExpandableLabel(buttonId, false) || labels.collapsed;

  button.addEventListener("click", function () {
    const isExpanded = this.getAttribute("aria-expanded") === "true";

    items.forEach(function (item) {
      item.classList.toggle("is-visible", !isExpanded);
    });

    this.setAttribute("aria-expanded", String(!isExpanded));

    const label = getExpandableLabel(buttonId, !isExpanded);
    this.textContent = label || (isExpanded ? labels.collapsed : labels.expanded);
  });
};

toggleExpandableItems("viewAllDestBtn", ".extra-dest", {
  collapsed: "More Destinations",
  expanded: "Show Fewer Destinations"
});

toggleExpandableItems("viewAllBtn", ".extra-package", {
  collapsed: "View All Departures",
  expanded: "Show Fewer Departures"
});

/**
 * reveal on scroll + optional lightbox
 */

document.addEventListener("DOMContentLoaded", function () {
  refreshExpandableButtonLabels();

  const revealElements = document.querySelectorAll("[data-reveal]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealElements.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach(function (element) {
        element.classList.add("revealed");
      });
    } else {
      const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px"
      });

      revealElements.forEach(function (element) {
        revealObserver.observe(element);
      });
    }
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("caption");
  const closeBtn = document.querySelector(".lightbox .close");
  const thumbs = document.querySelectorAll(".grid-lightbox .thumb img");

  if (!lightbox || !lightboxImg || !caption || !closeBtn || !thumbs.length) return;

  thumbs.forEach(function (img) {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
      caption.textContent = img.alt;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
});

