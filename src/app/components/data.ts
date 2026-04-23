import { Brain, Heart, MousePointer } from 'lucide-react';
import type { Project } from './constants';

// --- Asset Imports ---
import proxiteMain from 'figma:asset/9fb71577b36a5f2902d21f7da6b2bb8a0131f00d.png';
import proxiteGallery1 from 'figma:asset/7f69eef60bd0c552c0a73ae4aad9d3c87c3e0513.png';
import proxiteGallery2 from 'figma:asset/49dabbf29e61b7c6130ebe6479a7332264bf47d1.png';
import proxiteGallery3 from 'figma:asset/8c5d34bd156f0a00415a524398d95649f31f5264.png';
import youtubeThumbnail1 from 'figma:asset/4ec4620dfad5fb712b9d7025ebdef7cef62d109e.png';
import youtubeThumbnail2 from 'figma:asset/daf4e427d25432cd66df763b773351e578077985.png';
import youtubeThumbnail3 from 'figma:asset/619387d45f996ad30966e18f3dcf0c1874ff118e.png';
import youtubeThumbnail4 from 'figma:asset/ff3889016557fb236c7ccc3417cc185f554292c1.png';
import soleiaMain from 'figma:asset/1b0ab6cc13e1d18739be295474b2988fad41d52b.png';
import soleiaGallery1 from 'figma:asset/c3d10e7d1a87909086573730a8f28e4d240c2eef.png';
import soleiaGallery2 from 'figma:asset/fad492e43f8d5fba3530bafc7379865293ee9d3e.png';
import soleiaGallery3 from 'figma:asset/76f7261ad7bc516e6ae4ad85c8495f62793427b9.png';
import soleiaGallery4 from 'figma:asset/760c50f3a0e76dc0fd64a08a398ea33dcd5a30bf.png';
import soleiaCarousel1 from 'figma:asset/7a0504d33e4b111bfb07547c3d15846ab4ff4c09.png';
import soleiaCarousel2 from 'figma:asset/f6f934ecde6300ea4c812b87b0ca26dbf13cf7c1.png';
import soleiaCarousel3 from 'figma:asset/559b96b556b5e41d95b35393626879a6033e9ea3.png';
import soleiaCarousel4 from 'figma:asset/542d02f80c3949f938dd4cb27df6f4f73bf0c11e.png';
import soleiaCarousel5 from 'figma:asset/9e146de8329bb67bbfc7c86bd5ddc7c0ff24037d.png';
import glowringaMain from 'figma:asset/e3d54a58991be3be000f851fdd2f5cb543a621cb.png';
import glowringaGallery1 from 'figma:asset/8e00497efdb9f5d659a526da45a164fb2a1c2e8c.png';
import glowringaGallery2 from 'figma:asset/be51032d50fce0b2bcc9971aa3ed0a05164284b7.png';
import glowringaGallery3 from 'figma:asset/dc57eb8ded393cfec7275d6a5608c5bfe669e07a.png';
import glowringaGallery4 from 'figma:asset/4069e092b40429f133dd7836a01e885d73c876a3.png';
import glowringaGallery5 from 'figma:asset/cd62e1161a8a16467f6162d5b89f5c98ce043a63.png';
import glowringaGallery6 from 'figma:asset/c8ddf7f90bfe96bcb02dc7c27d5cb7b72a05ee69.png';
import glowringaGallery7 from 'figma:asset/5528db6904264e69c1a017e81b494c6bc183b829.png';
import glowringaGallery8 from 'figma:asset/4852b46d8e6ad66763812ab21dc90fb0fc044fd7.png';
import glowringaCarousel1 from 'figma:asset/a0cdb0786da24ffe1d09a1865c93c99ea6b1bd7e.png';
import glowringaCarousel2 from 'figma:asset/798a9527d09d89d1fb03c6b7a81dce4bba154ea4.png';
import glowringaCarousel3 from 'figma:asset/3bdba79a4c06820a295e8dd5a6c5131b55f430ea.png';
import glowringaCarousel4 from 'figma:asset/325b997c4db3a4731f013f0cf468ecf809ea425c.png';
import glowringaCarousel5 from 'figma:asset/f783939418f0b4301b97efffe3d48305975a7ce0.png';
import lgmMain from 'figma:asset/357657758c57224d05b6071b8cfe61030b0685b5.png';
import lgmGallery1 from 'figma:asset/7dff0684965ed885861838aa95ec4ec4974b9ae6.png';
import lgmGallery2 from 'figma:asset/c5f3ccafb9c3140c904d6b43291e3d8b6ac5b4b4.png';
import lgmGallery3 from 'figma:asset/7dc6d0b0e348af8fd1167adfcb67203b91ed43e0.png';
import lgmGallery4 from 'figma:asset/92d1ad3e9c869a5b1bd4edaf9dc5f3074dbe135c.png';
import lgmGallery5 from 'figma:asset/b3d3a5c0d6d277062d1cc4d0400e7ca884695a5d.png';
import museeMain from 'figma:asset/0a8ac2c86c8efb48ad1cdc02fa5f97c34d73561d.png';
import museeGallery1 from 'figma:asset/06e5d61dc76f22422b1ac2afc57820b535d6e3dc.png';
import museeGallery2 from 'figma:asset/d408dff3c0d6156aefbc6db23301184fccbe0837.png';
import museeGallery3 from 'figma:asset/1d880f81b480c11fab59da1e83fd81ea7ff16997.png';

// --- Preuves Soleia ---
import soleiaPreuve1 from 'figma:asset/f799442ebe81d33b799a6703757fe8051a1b1b1a.png';
import soleiaPreuve2 from 'figma:asset/dc8e02eaaf248dba9347cec3163cfec764f7d0c1.png';
import soleiaPreuve3 from 'figma:asset/b4da0c3ad7922c0a6eb65ac44801535d9a9d49da.png';
import soleiaDevisRGraphismes from 'figma:asset/12c9de559abbaae734d374820f389b6b9a8b6bf1.png';
import soleiaDevisKoray from 'figma:asset/dfba8191f881fd8748d02411a714facc30ab8e20.png';
import soleiaReponseKoray from 'figma:asset/a0daadd0dcf3a59b59b51d88cd8a2a8b4a25bf02.png';
import soleiaReponseRGraphismes from 'figma:asset/94bb68f79d151af26c1b343733475d16e2a407b7.png';
import soleiaMoodboard1 from 'figma:asset/51dfdb228aa24f32c0ce555b53192741ccdd3da3.png';
import soleiaMoodboard2 from 'figma:asset/61b139733124731cc9c4df4b47c7a40caca2e871.png';

// --- New Project Cover Images ---
import proxiteCover from 'figma:asset/b579983ca226cee33426e1853248fb818a2b91cf.png';
import youtubeCover from 'figma:asset/a91fe70baf3bf4764af71548239566c5c2ae7290.png';
import soleiaCover from 'figma:asset/629711dbaf916594f6e29bf06846a1cdc6c96a26.png';
import glowringaCover from 'figma:asset/e4e26dc688ef74716b716733e24223792de0f8d2.png';
import lgmCover from 'figma:asset/4a23963891fa3353792c4afda731c1d26ba57f0d.png';
import museeCover from 'figma:asset/a539de32c6018e89ee07bec1d2a892b6c30c4ead.png';

// --- Project Taglines (pour l'accueil) ---
export const PROJECT_TAGLINES: Record<number, string> = {
  3: "Construire l'identité graphique de Soleia Expérience",
  1: 'Concevoir une campagne de communication pour Proxité',
  2: 'Attirer l\'attention avec des miniatures impactantes',
  4: "Donner vie à l'univers visuel de Glowringa",
  5: "Repenser l'identité de marque de LGM",
  7: 'Valoriser une exposition artistique entre deux îles',
};

// --- Timeline Data ---
export const TIMELINE_STEPS = [
  { 
    year: '2021 - 2024', 
    title: 'BAC Pro Métiers de la Mode', 
    desc: 'Mention Très Bien – Lycée Professionnel Isnelle Amelin (974 – La Réunion)' 
  },
  { 
    year: '2024 - 2026', 
    title: 'BTS Communication', 
    desc: 'École du Numérique (974 – La Réunion)' 
  },
] as const;

// --- Projects Data ---
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Proxité',
    subtitle: 'Quand prévention rime avec créativité',
    category: 'formation',
    year: '2025',
    image: proxiteCover,
    brief: {
      context: 'Proxité, association française accompagnant les jeunes des quartiers en difficulté, nous a sollicités pour une campagne de sensibilisation aux addictions (alcool, tabac, drogues), dépendance aux écrans et conduites à risque.',
      hook: '« Savez-vous que 49 000 décès par an en France sont dus à la consommation d\'alcool ? »',
      mission: 'Design percutant, respect de la charte Proxité avec ajout de rouge (#6B0F1A) pour la prévention et noir (#0E0E0E) pour les contrastes.',
      slogan: '« Un verre de trop ? Un souvenir en moins. »',
      supports: 'Affiches 4x3 : visuel impactant + slogan + message sanitaire obligatoire. Post Instagram : geste symbolique "dire non" + description dynamique. Vidéo courte : scène de soirée illustrant les risques, slogan et son impactant.',
      result: 'Sensibilisation accrue, engagement des jeunes sur les réseaux sociaux et via supports physiques. Réduction potentielle des comportements à risque et prise de conscience collective sur les dangers de l\'alcool et autres addictions.',
    },
    objectives: [
      { type: 'Cognitif', icon: Brain, desc: 'Informer sur les dangers des addictions et comportements à risque.' },
      { type: 'Conatif', icon: MousePointer, desc: 'Encourager des comportements responsables et réduire la consommation.' },
      { type: 'Affectif', icon: Heart, desc: 'Susciter la prise de conscience et engager la réflexion personnelle.' },
    ],
    targets: [
      {
        type: 'Cible unique',
        desc: 'Jeunes de 15 à 25 ans (collégiens, lycéens, étudiants), exposés à l\'effet de groupe et à la minimisation des risques.',
        channels: 'TikTok, Instagram, X, YouTube, Twitch, affiches près des écoles, podcasts, clips TV',
      },
    ],
    gallery: [proxiteMain, proxiteGallery1, proxiteGallery2, proxiteGallery3],
    galleryFolders: {
      reseauxSociaux: [
        { image: proxiteGallery2, description: 'Post Instagram' },
        { image: proxiteGallery3, description: 'Story Instagram' },
      ],
      videos: [],
      print: [
        { image: proxiteMain, description: 'Affiche' },
        { image: proxiteGallery1, description: 'Affiche' },
      ],
      plus: [],
    },
  },
  {
    id: 2,
    title: 'Miniatures YouTube',
    subtitle: 'Donner envie de cliquer en un regard',
    category: 'perso',
    year: '2025',
    image: youtubeCover,
    brief: {
      context: 'Création de miniatures YouTube pour mes propres vidéos, avec l\'objectif de créer des visuels lisibles, attractifs et fidèles à mon univers. Chaque miniature est pensée pour capter l\'attention tout en restant cohérente avec l\'identité visuelle de ma chaîne.',
      mission: 'Couleurs contrastées pour attirer l\'œil, typographie lisible en format miniature, composition pensée pour l\'affichage YouTube.',
      result: 'Des miniatures qui parlent directement à ma communauté, testant différentes compositions et jouant avec la hiérarchie des textes.',
    },
    objectives: [
      { type: 'Cognitif', icon: Brain, desc: 'Faire comprendre rapidement le sujet de la vidéo.' },
      { type: 'Conatif', icon: MousePointer, desc: 'Donner envie de cliquer.' },
      { type: 'Affectif', icon: Heart, desc: 'Créer une première impression fun et engageante.' },
    ],
    targets: [
      {
        type: 'Cible unique',
        desc: 'Mes abonnés YouTube, ma communauté qui me suit et qui apprécie mon univers visuel.',
      },
    ],
    gallery: [youtubeThumbnail1, youtubeThumbnail2, youtubeThumbnail3, youtubeThumbnail4],
    galleryFolders: {
      reseauxSociaux: [
        { image: youtubeThumbnail1, description: 'Miniature YouTube' },
        { image: youtubeThumbnail2, description: 'Miniature YouTube' },
      ],
      videos: [
        { image: 'https://www.youtube.com/embed/D3SQ9SALsvM', description: 'Short YouTube' },
        { image: 'https://www.youtube.com/embed/dByTC3mf5VI', description: 'Short YouTube' },
        { image: 'https://www.youtube.com/embed/RtSHZumV4Kw', description: 'Short YouTube' },
        { image: 'https://www.youtube.com/embed/3nkG9l5xVVY', description: 'Short YouTube' },
        { image: 'https://www.youtube.com/embed/mOVxQXjOSlQ', description: 'Short YouTube' },
        { image: 'https://www.youtube.com/embed/zCvjs8esx6c', description: 'Short YouTube' },
        { image: 'https://www.youtube.com/embed/WNJGYIiEVqY', description: 'Short YouTube' },
        { image: 'https://www.youtube.com/embed/Vz7D5Eu5yBs', description: 'Short YouTube' },
        { image: 'https://www.youtube.com/embed/W2akCf7_WLo', description: 'Short YouTube' },
      ],
      print: [],
      plus: [
        { image: youtubeThumbnail3, description: 'Miniature YouTube' },
        { image: youtubeThumbnail4, description: 'Miniature YouTube' },
      ],
    },
  },
  {
    id: 3,
    title: 'Soleia Expérience',
    subtitle: 'Créer une expérience créative et apaisante',
    category: 'perso',
    year: '2025',
    image: soleiaCover,
    brief: {
      context: 'Soleia Expérience est un projet de communication que j\'ai imaginé et développé de A à Z. Il s\'agit d\'ateliers créatifs et bien-être pensés comme des moments de pause, d\'expression personnelle et de recentrage. J\'ai conçu l\'identité visuelle, les supports de communication et la promotion sur les réseaux sociaux afin de créer un univers cohérent, doux et inspirant.',
      mission: 'Créer une identité visuelle douce et inspirante, développer des supports de communication cohérents et assurer la promotion sur les réseaux sociaux.',
      result: 'Un univers de marque harmonieux qui transmet les valeurs de bien-être, de créativité et d\'authenticité portées par Soleia Expérience.',
    },
    copyStrategy: {
      promesse: 'Soleia Expérience permet aux participantes de reprendre confiance en elles, s\'exprimer librement et s\'accorder un moment de bien-être, dans un cadre bienveillant et inspirant.',
      messageClé: 'Un moment entre filles pour créer, se révéler et reprendre confiance en soi.',
      ton: 'Chaleureux, humoristique, doux et inspirant.',
      concept: 'Soleia Expérience propose des ateliers créatifs et introspectifs entre femmes, conçus comme des moments de partage, mêlant création et développement personnel, pour favoriser l\'expression de soi et la connexion aux autres.',
    },
    objectives: [
      { type: 'Cognitif', icon: Brain, desc: 'Faire connaître Soleia Expérience et le concept des ateliers créatifs bien-être.' },
      { type: 'Affectif', icon: Heart, desc: 'Créer un sentiment de confiance, de douceur et d\'inspiration autour de l\'expérience proposée.' },
      { type: 'Conatif', icon: MousePointer, desc: 'Donner envie de participer aux ateliers et de s\'inscrire.' },
    ],
    targets: [
      {
        type: 'Cible unique',
        desc: 'Jeunes adultes (18-35 ans) intéressés par le développement personnel, la créativité et les expériences bien-être.',
      },
    ],
    gallery: [soleiaMain, soleiaGallery1, soleiaGallery2, soleiaGallery3, soleiaGallery4],
    galleryFolders: {
      reseauxSociaux: [
        { 
          image: soleiaCarousel1, 
          description: 'Carrousel Instagram',
          extraImages: [
            { image: soleiaCarousel1, description: '1' },
            { image: soleiaCarousel2, description: '2' },
            { image: soleiaCarousel3, description: '3' },
            { image: soleiaCarousel4, description: '4' },
            { image: soleiaCarousel5, description: '5' },
          ]
        },
        { image: soleiaGallery1, description: 'Post Instagram' },
        { image: soleiaGallery2, description: 'Post Instagram' },
        { image: soleiaGallery4, description: 'Post Instagram' },
      ],
      videos: [],
      print: [],
      plus: [],
      preuves: [
        {
          image: soleiaPreuve1,
          description: 'Demande de devis et devis – R Graphismes',
          extraImages: [
            { image: soleiaDevisRGraphismes, description: 'Devis – R Graphismes' },
            { image: soleiaReponseRGraphismes, description: 'Réponse – R Graphismes' },
          ],
        },
        {
          image: soleiaPreuve2,
          description: 'Demande de devis – Koray Coworking',
          extraImages: [
            { image: soleiaDevisKoray, description: 'Devis – Koray Coworking' },
            { image: soleiaReponseKoray, description: 'Réponse – Koray Coworking' },
          ],
        },
      ],
      moodboard: [
        { image: soleiaMoodboard1, description: 'Moodboard – Atelier Hens Party' },
        { image: soleiaMoodboard2, description: 'Moodboard – Ambiance & Inspirations' },
      ],
    },
  },
  {
    id: 4,
    title: 'Glowringa',
    subtitle: "Donner vie à l'univers visuel de Glowringa",
    category: 'entreprise',
    year: '2025',
    image: glowringaCover,
    brief: {
      context: 'Travail réalisé dans le cadre de mon alternance au sein de Gayar Expertise. Glowringa, marque récente de boissons à base de moringa, positionnée comme alternative saine, naturelle et énergisante.',
      constraints: 'Délai très court, identité visuelle encore en construction, respect des formats réseaux sociaux, se démarquer de la concurrence (marques de matcha et healthy).',
      mission: 'Veille créative et sectorielle pour identifier tendances visuelles et formats performants. Sélection des couleurs, typographies, ambiances et éléments graphiques pertinents pour Glowringa. Conception et création de visuels pour le feed Instagram (Canva). Validation interne avec la tutrice et ajustements selon retours.',
      result: 'Renforcer l\'identité visuelle de Glowringa sur Instagram et améliorer la cohérence du feed afin de rendre la marque plus reconnaissable et attractive auprès des jeunes. La campagne vise également à augmenter l\'engagement sur les publications et à soutenir la communication commerciale de fin d\'année en valorisant Glowringa comme une alternative moderne et naturelle aux boissons tendances comme le matcha.',
    },
    objectives: [
      { type: 'Cognitif', icon: Brain, desc: 'Montrer que Glowringa est une boisson saine, naturelle et tendance.' },
      { type: 'Conatif', icon: MousePointer, desc: 'Inciter à interagir avec le feed et tester le produit pendant la période festive.' },
      { type: 'Affectif', icon: Heart, desc: "Créer un univers moderne et attractif qui donne envie de s'identifier à la marque." },
    ],
    targets: [
      {
        type: 'Cible principale',
        desc: 'Jeunes de 18 à 25 ans, à la recherche d\'une alternative naturelle et tendance au matcha.',
      },
    ],
    gallery: [
      glowringaMain, glowringaGallery1, glowringaGallery2, glowringaGallery3,
      glowringaGallery4, glowringaGallery5, glowringaGallery6, glowringaGallery7,
      glowringaGallery8, glowringaCarousel1, glowringaCarousel2, glowringaCarousel3,
      glowringaCarousel4, glowringaCarousel5,
    ],
    galleryFolders: {
      reseauxSociaux: [
        { image: glowringaGallery1, description: 'Post Instagram' },
        { image: glowringaGallery2, description: 'Post Instagram' },
        { image: glowringaGallery3, description: 'Post Instagram' },
        { image: glowringaGallery4, description: 'Post Instagram' },
        { image: glowringaCarousel1, description: 'Carrousel Instagram' },
        { image: glowringaCarousel2, description: 'Carrousel Instagram' },
        { image: glowringaCarousel3, description: 'Carrousel Instagram' },
        { image: glowringaCarousel4, description: 'Carrousel Instagram' },
        { image: glowringaCarousel5, description: 'Carrousel Instagram' },
      ],
      videos: [],
      print: [],
      plus: [
        { image: glowringaMain, description: 'Visuel principal' },
        { image: glowringaGallery5, description: 'Exploration créative' },
        { image: glowringaGallery6, description: 'Exploration créative' },
        { image: glowringaGallery7, description: 'Exploration créative' },
        { image: glowringaGallery8, description: 'Exploration créative' },
      ],
    },
  },
  {
    id: 5,
    title: 'LGM',
    subtitle: "Repenser l'identité de marque de LGM",
    category: 'formation',
    year: '2025',
    image: lgmCover,
    brief: {
      context: 'Projet académique BTS Communication : LGM, glacier emblématique de La Réunion, souhaite moderniser son image et se repositionner sur un marché très concurrentiel. La marque veut affirmer une identité plus jeune, dynamique et créative, tout en conservant son ADN artisanal et local. Le projet consiste à concevoir le nouveau Brand Book de LGM afin de structurer son identité de marque et d\'harmoniser sa communication future.',
      mission: 'Réalisation d\'un audit de marque, d\'une étude des cibles, des tendances et de la concurrence afin de définir le positionnement, les valeurs et le territoire de marque de LGM. Conception d\'un Brand Book complet (storytelling, ton de marque, identité visuelle, positionnement) et création d\'une maquette de communication illustrant la nouvelle identité (publication réseaux sociaux, site ou application).',
      result: 'Structurer l\'identité de marque de LGM grâce à un Brand Book cohérent, capable de servir de référence pour la communication future et de moderniser l\'image du glacier.',
    },
    objectives: [
      { type: 'Cognitif', icon: Brain, desc: 'Faire comprendre le nouveau positionnement de LGM comme glacier artisanal moderne et local.' },
      { type: 'Affectif', icon: Heart, desc: 'Renforcer l\'image chaleureuse, créative et conviviale de la marque.' },
      { type: 'Conatif', icon: MousePointer, desc: "Donner envie de découvrir l'expérience LGM et ses produits." },
    ],
    targets: [
      {
        type: 'Coeur de cible',
        desc: 'Jeunes actifs (25-35 ans) sensibles aux produits artisanaux, locaux et plus "healthy", à la recherche d\'expériences gourmandes qualitatives.',
      },
      {
        type: 'Cible principale',
        desc: 'Consommateurs "healthy" attentifs à la composition des produits (moins sucré, végétal, sans lactose, ingrédients naturels) et intéressés par une consommation plus responsable.',
      },
      {
        type: 'Cible secondaire',
        desc: 'Créateurs de contenu locaux et entreprises / événements, permettant de renforcer la visibilité de la marque et de développer des opportunités de communication.',
      },
    ],
    gallery: [lgmMain, lgmGallery1, lgmGallery2, lgmGallery3, lgmGallery4, lgmGallery5],
    galleryFolders: {
      reseauxSociaux: [
        { image: lgmGallery3, description: 'Maquette réseaux sociaux' },
        { image: lgmGallery4, description: 'Maquette réseaux sociaux' },
      ],
      videos: [],
      print: [
        { image: lgmMain, description: 'Brand Book' },
        { image: lgmGallery1, description: 'Brand Book' },
        { image: lgmGallery2, description: 'Brand Book' },
      ],
      plus: [
        { image: lgmGallery5, description: 'Maquette application mobile' },
      ],
    },
  },
  {
    id: 7,
    title: 'Musée Léon Dierx',
    subtitle: 'Exposition "Couleurs Australes"',
    category: 'formation',
    year: '2024',
    image: museeCover,
    brief: {
      context: "Dans le cadre d'un projet pédagogique en BTS Communication, j'ai conçu deux supports print pour promouvoir l'exposition temporaire « Couleurs Australes : Regards Croisés Réunion-Maurice », organisée par le Musée Léon Dierx à Saint-Denis. L'objectif était de créer une communication visuelle cohérente et impactante, capable d'annoncer l'événement et d'attirer différents publics vers le musée.",
      mission: "Conception de deux supports de communication print respectant la charte graphique du musée : une affiche 4x3 destinée à l'affichage urbain et un flyer A5 recto/verso destiné à informer le public. Le travail consistait à hiérarchiser l'information, valoriser le visuel principal de l'exposition et assurer la cohérence graphique entre les deux supports.",
      result: "Présenter une communication visuelle claire et cohérente permettant de valoriser l'exposition et d'attirer différents publics vers le musée.",
    },
    objectives: [
      { type: 'Cognitif', icon: Brain, desc: "Informer sur l'exposition, ses dates et son lieu." },
      { type: 'Affectif', icon: Heart, desc: "Susciter la curiosité et l'intérêt pour l'art contemporain des îles." },
      { type: 'Conatif', icon: MousePointer, desc: 'Inciter le public à visiter le musée.' },
    ],
    targets: [
      { type: 'Coeur de cible', desc: "Public local intéressé par l'art et la culture." },
      { type: 'Cible principale', desc: 'Touristes de passage à La Réunion.' },
      { type: 'Cible secondaire', desc: 'Enseignants, scolaires et communauté mauricienne.' },
    ],
    gallery: [museeGallery1, museeGallery2, museeGallery3, museeMain],
    galleryFolders: {
      reseauxSociaux: [],
      videos: [],
      print: [
        { image: museeGallery1, description: 'Affiche 4x3' },
        { image: museeGallery2, description: 'Flyer A5 recto' },
        { image: museeGallery3, description: 'Flyer A5 verso' },
        { image: museeMain, description: 'Visuel principal' },
      ],
      plus: [],
    },
  },
];