export default {
  app: {
    title: 'Fiche de cadrage projet web',
    subtitle: 'Phase 1 — Clarification du projet',
    institution: 'ESIG'
  },
  dashboard: {
    title: 'Fiches de projet web',
    subtitle: 'Sélectionnez une fiche pour commencer ou continuer votre travail.',
    comingSoon: 'Bientôt',
    cadrage: {
      title: 'Fiche de cadrage',
      description: 'Objectif, personas, fonctionnalités MoSCoW, contraintes, critères de succès.'
    },
    cardSorting: {
      title: 'Card Sorting',
      description: 'Organiser l\'information selon la logique des utilisateurs.'
    },
    design: {
      title: 'Design & identité visuelle',
      description: 'Palette de couleurs, typographie, charte graphique.'
    },
    maquettes: {
      title: 'Maquettes',
      description: 'Sitemap, wireframes, prototypes interactifs.'
    },
    checklist: {
      title: 'Checklist finale',
      description: 'Validation complète avant la livraison du projet.'
    }
  },
  header: {
    sectionTitle: 'Identification',
    lastName: 'Nom',
    lastNamePlaceholder: 'Dupont',
    firstName: 'Prénom',
    firstNamePlaceholder: 'Marie',
    date: 'Date de création',
    repoUrl: 'URL du dépôt GitHub',
    repoUrlPlaceholder: 'https://github.com/votre-pseudo/votre-projet',
    repoUrlHint: 'Le lien vers votre code source',
    siteUrl: 'URL du site en ligne',
    siteUrlPlaceholder: 'https://votre-projet.vercel.app',
    siteUrlHint: 'Vercel, GitHub Pages ou Infomaniak'
  },
  sections: {
    objective: {
      title: '1. Objectif du projet',
      description: 'Définissez clairement ce que votre projet doit accomplir.',
      mainObjective: 'Objectif principal',
      mainObjectiveHint: 'Formulez toujours avec « Permettre à [qui] de [faire quoi] pour [quel résultat] ».',
      mainObjectivePlaceholder: 'Ex : Créer un site vitrine pour un salon de coiffure permettant la prise de rendez-vous en ligne.',
      projectName: 'Nom du projet',
      projectNamePlaceholder: 'Ex : CoiffurePro'
    },
    personas: {
      title: '2. Personas',
      description: 'Qui sont les utilisateurs de votre site ? Décrivez au moins un profil type.',
      add: 'Ajouter un persona',
      label: 'Persona',
      name: 'Nom fictif',
      namePlaceholder: 'Ex : Marie Dupont',
      age: 'Âge',
      agePlaceholder: 'Ex : 34',
      job: 'Profession',
      jobPlaceholder: 'Ex : Enseignante',
      level: 'Niveau technique',
      levelPlaceholder: 'Choisir…',
      levelOptions: {
        novice: 'Novice',
        intermediate: 'Intermédiaire',
        expert: 'Expert'
      },
      device: 'Appareil principal',
      devicePlaceholder: 'Choisir…',
      deviceOptions: {
        smartphone: 'Smartphone',
        tablet: 'Tablette',
        desktop: 'Ordinateur'
      },
      goal: 'Objectif sur le site',
      goalPlaceholder: 'Que cherche cette personne en visitant votre site ?',
      frustrations: 'Frustrations potentielles',
      frustrationsPlaceholder: 'Qu\'est-ce qui pourrait l\'agacer ou la bloquer ?'
    },
    features: {
      title: '3. Fonctionnalités (MoSCoW)',
      description: 'Listez les fonctionnalités et classez-les par priorité.',
      add: 'Ajouter une fonctionnalité',
      columnNumber: '#',
      columnFeature: 'Fonctionnalité',
      columnPriority: 'Priorité',
      columnActions: 'Actions',
      descriptionPlaceholder: 'Décrire la fonctionnalité…',
      priorityPlaceholder: 'Sélectionner…',
      priorityLabel: 'Priorité fonctionnalité',
      priorities: {
        must: 'Must — indispensable',
        should: 'Should — important',
        could: 'Could — souhaitable',
        wont: 'Won\'t — exclu'
      }
    },
    constraints: {
      title: '4. Contraintes',
      description: 'Quelles sont les limites du projet ? Délais, ressources, technologies.',
      deadline: 'Date de livraison',
      hours: 'Heures disponibles',
      hoursPlaceholder: 'Ex : 40',
      budget: 'Budget',
      budgetPlaceholder: 'Ex : 0 CHF (hébergement scolaire)',
      tech: 'Technologies imposées',
      techPlaceholder: 'Ex : HTML, CSS, JavaScript',
      accessibility: 'Niveau d\'accessibilité',
      accessibilityPlaceholder: 'Choisir un niveau WCAG',
      accessibilityOptions: {
        a: 'WCAG A — minimum',
        aa: 'WCAG AA — recommandé',
        aaa: 'WCAG AAA — exigeant'
      },
      legal: 'Contraintes légales',
      legalPlaceholder: 'Ex : RGPD, mentions légales, droit à l\'image…'
    },
    criteria: {
      title: '5. Critères de succès',
      description: 'Comment saurez-vous que le projet est réussi ? Définissez des critères concrets et vérifiables.',
      add: 'Ajouter un critère',
      checkboxLabel: 'Marquer comme atteint',
      textPlaceholder: 'Ex : Le site est accessible sur mobile et desktop',
      verificationPlaceholder: 'Comment vérifier ? (ex : Lighthouse, test 5 personnes…)'
    }
  },
  cardSorting: {
    title: 'Card Sorting',
    subtitle: 'Phase 2 — Organisation de l\'information',
    projectName: 'Nom du projet',
    projectNamePlaceholder: 'Ex : CoiffurePro',
    sections: {
      cards: {
        title: '1. Cartes d\'information',
        description: 'Listez toutes les pages, contenus ou fonctionnalités de votre site (1 carte = 1 élément).',
        labelPlaceholder: 'Nom de la carte (ex : Page d\'accueil)',
        descriptionPlaceholder: 'Description courte (optionnel)',
        add: 'Ajouter une carte',
        printCards: 'Imprimer les cartes à découper'
      },
      participants: {
        title: '2. Participants',
        description: 'Notez les personnes qui ont participé au tri (minimum 3, autres que vous).',
        label: 'Participant',
        name: 'Nom / pseudo',
        namePlaceholder: 'Ex : Alice',
        profile: 'Profil',
        profilePlaceholder: 'Ex : Élève, Parent, Enseignant',
        notes: 'Observations pendant le tri',
        notesPlaceholder: 'Hésitations, commentaires, comportements observés…',
        add: 'Ajouter un participant'
      },
      results: {
        title: '3. Résultats du tri',
        description: 'Décrivez les tendances et regroupements récurrents observés lors des tris.',
        summaryLabel: 'Synthèse des résultats',
        summaryPlaceholder: 'Quels regroupements récurrents avez-vous identifiés ?\nQuelles catégories reviennent chez la majorité des participants ?\nY a-t-il eu des hésitations ou des surprises ?'
      },
      photos: {
        title: '4. Photos du tri',
        description: 'Prenez des photos de vos cartes triées par les participants.',
        uploadLabel: 'Ajouter une photo'
      },
      architecture: {
        title: '5. Architecture de navigation',
        description: 'Construisez l\'arborescence de navigation de votre site. Utilisez les flèches pour réorganiser et les boutons d\'indentation pour créer la hiérarchie.',
        placeholder: 'Nom de la page (ex : Accueil)',
        add: 'Ajouter une page',
        indent: 'Indenter',
        outdent: 'Désindenter',
        moveUp: 'Monter',
        moveDown: 'Descendre',
        remove: 'Supprimer la page'
      },
      checklist: {
        title: '6. Checklist de validation',
        description: 'Vérifiez que toutes les étapes du card sorting ont été réalisées.'
      }
    }
  },
  design: {
    title: 'Design & identité visuelle',
    subtitle: 'Phase 3 — Charte graphique',
    projectName: 'Nom du projet',
    projectNamePlaceholder: 'Ex : CoiffurePro',
    sections: {
      colors: {
        title: '1. Palette de couleurs',
        description: 'Choisissez 3-4 couleurs et vérifiez les contrastes (ratio ≥ 4.5:1 pour WCAG AA). Règle 60-30-10.',
        colorName: 'Nom',
        colorNamePlaceholder: 'Ex : Principale',
        colorHex: 'Code hex',
        colorHexPlaceholder: 'Ex : #0F766E',
        colorUsage: 'Utilisation',
        colorUsagePlaceholder: 'Ex : Boutons, liens',
        add: 'Ajouter une couleur',
        contrastNotes: 'Notes sur les contrastes',
        contrastNotesPlaceholder: 'Résultats du test WebAIM, ratios calculés…',
        realtimeColorsUrl: 'Lien Realtime Colors',
        realtimeColorsUrlPlaceholder: 'https://www.realtimecolors.com/?colors=...&fonts=...',
        realtimeColorsUrlDescription: 'Collez ici votre lien Realtime Colors avec vos couleurs et polices. L\'enseignant pourra voir votre palette appliquée sur un vrai site.',
        realtimeColorsUrlButton: 'Ouvrir dans Realtime Colors'
      },
      typography: {
        title: '2. Typographie',
        description: 'Maximum 2 polices. Taille minimale : 16px. Interligne : 1.5 à 1.7.',
        fontName: 'Police',
        fontNamePlaceholder: 'Ex : Inter',
        fontUsage: 'Rôle',
        fontUsagePlaceholder: 'Choisir…',
        usageOptions: {
          headings: 'Titres',
          body: 'Corps de texte',
          code: 'Code',
          other: 'Autre'
        },
        fontUrl: 'URL ou source',
        fontUrlPlaceholder: 'Ex : Google Fonts, self-hosted',
        addFont: 'Ajouter une police',
        typeScale: 'Échelle typographique',
        typeScaleNamePlaceholder: 'Élément (ex : h1)',
        typeScaleValuePlaceholder: 'Taille (ex : 36px)',
        addTypeScale: 'Ajouter une taille'
      },
      spacings: {
        title: '3. Espacements',
        description: 'Définissez une grille d\'espacements cohérente (multiples de 4 ou 8).',
        namePlaceholder: 'Nom (xs, sm…)',
        valuePlaceholder: 'Valeur (8px…)',
        add: 'Ajouter un espacement'
      },
      identity: {
        title: '4. Identité visuelle',
        description: 'Décrivez le style global, l\'ambiance et les principes de design.',
        label: 'Description de l\'identité visuelle',
        placeholder: 'Décrivez le style recherché : ambiance, inspirations, ton visuel.\n\nEx :\n- Style minimaliste et professionnel\n- Tons sarcelle et gris ardoise\n- Espace blanc généreux\n- Bordures arrondies et ombres subtiles'
      },
      checklist: {
        title: '5. Checklist de validation',
        description: 'Vérifiez que toutes les étapes du design ont été réalisées.'
      }
    }
  },
  maquettes: {
    title: 'Maquettes',
    subtitle: 'Phase 5 — Wireframes et prototypes',
    projectName: 'Nom du projet',
    projectNamePlaceholder: 'Ex : CoiffurePro',
    sections: {
      pages: {
        title: '1. Pages maquettées',
        description: 'Listez les pages principales avec leur niveau de fidélité et l\'outil utilisé.',
        pageLabel: 'Page',
        pageName: 'Nom de la page',
        pageNamePlaceholder: 'Ex : Page d\'accueil',
        pageType: 'Type',
        pageTypePlaceholder: 'Choisir…',
        types: {
          sketch: 'Croquis (basse fidélité)',
          wireframe: 'Wireframe (moyenne fidélité)',
          mockup: 'Mockup (haute fidélité)'
        },
        pageTool: 'Outil',
        pageToolPlaceholder: 'Ex : Figma, papier',
        mockupUrl: 'Lien maquette',
        mockupUrlPlaceholder: 'https://www.figma.com/file/...',
        mockupUrlHint: 'Figma, Excalidraw, Penpot... Laissez vide si maquette papier (uploadez la photo ci-dessous)',
        pageNotes: 'Notes / interactions',
        pageNotesPlaceholder: 'Annotations, interactions documentées…',
        screenshot: 'Capture d\'écran',
        add: 'Ajouter une page',
        gridSystem: 'Grille de mise en page',
        gridSystemPlaceholder: 'Ex : Grille 12 colonnes, base 8px, gouttières 16px'
      },
      tests: {
        title: '2. Tests utilisateurs',
        description: 'Documentez les tests effectués sur vos maquettes (test 5 secondes, premier clic, etc.).',
        testLabel: 'Test',
        participant: 'Participant',
        participantPlaceholder: 'Ex : Alice (élève)',
        testType: 'Type de test',
        testTypePlaceholder: 'Ex : Test 5 secondes, premier clic',
        findings: 'Résultats / observations',
        findingsPlaceholder: 'Ce que le participant a trouvé, ses hésitations…',
        add: 'Ajouter un test',
        iterations: 'Résumé des itérations',
        iterationsPlaceholder: 'Quelles modifications avez-vous faites suite aux tests ?'
      },
      checklist: {
        title: '3. Checklist de validation',
        description: 'Vérifiez que toutes les étapes du maquettage ont été réalisées.'
      }
    }
  },
  checklist: {
    title: 'Checklist finale',
    subtitle: 'Phase 9 — Validation avant mise en ligne',
    projectName: 'Nom du projet',
    projectNamePlaceholder: 'Ex : CoiffurePro',
    stats: {
      title: 'Progression',
      essential: 'Essentiels',
      important: 'Importants',
      recommended: 'Recommandés',
      required: 'requis',
      optional: 'optionnel'
    },
    priorities: {
      essential: '🔴',
      important: '🟠',
      recommended: '🟢'
    },
    validation: {
      title: 'Validation finale',
      exceptions: 'Exceptions justifiées',
      exceptionsPlaceholder: 'Éléments non conformes avec justification…',
      knownBugs: 'Bugs connus acceptés',
      knownBugsPlaceholder: 'Bugs identifiés mais acceptés avec justification…',
      testedDevices: 'Appareils testés',
      testedDevicesPlaceholder: 'iPhone 15, Samsung S24, MacBook Pro…',
      testedBrowsers: 'Navigateurs testés',
      testedBrowsersPlaceholder: 'Chrome, Safari, Firefox…',
      decision: 'Décision finale',
      decisionPlaceholder: 'Choisir…'
    },
    decisions: {
      ready: '✅ Prêt pour la mise en ligne',
      reservations: '⚠️ Prêt avec réserves',
      corrections: '❌ Corrections nécessaires'
    }
  },
  actions: {
    copyLink: 'Partager',
    copyLinkTooltip: 'Copie un lien partageable dans le presse-papier',
    download: 'Télécharger',
    downloadTooltip: 'Exporter la fiche au format JSON',
    import: 'Charger',
    importTooltip: 'Importer une fiche sauvegardée',
    print: 'Imprimer',
    printTooltip: 'Ouvrir l\'aperçu d\'impression',
    reset: 'Tout effacer',
    autoSaved: 'Sauvegarde auto',
    readOnly: 'Consultation',
    progress: '{filled}/{total} sections'
  },
  validation: {
    lastNameRequired: 'Le nom est obligatoire.',
    objectiveRequired: 'L\'objectif principal est obligatoire.',
    projectNameRequired: 'Le nom du projet est obligatoire.',
    cardsRequired: 'Ajoutez au moins une carte avec un nom.',
    colorsRequired: 'Définissez au moins une couleur.',
    fixErrors: 'Corrigez les champs obligatoires avant de partager.'
  },
  toasts: {
    saved: 'Sauvegardé',
    linkCopied: 'Lien copié — collez-le pour partager votre fiche !',
    downloaded: 'Fiche téléchargée',
    imported: 'Fiche importée avec succès !',
    importError: 'Erreur : le fichier n\'est pas un JSON valide.',
    loadedFromLink: 'Fiche chargée depuis le lien partagé',
    reset: 'Fiche réinitialisée'
  },
  modals: {
    resetTitle: 'Tout effacer ?',
    resetDescription: 'Tous les champs seront vidés et la sauvegarde locale supprimée. Cette action est irréversible.',
    resetConfirm: 'Oui, tout effacer',
    resetCancel: 'Annuler'
  },
  upload: {
    dropzone: 'Cliquer ou glisser une image ici',
    uploading: 'Upload en cours…',
    success: 'Image uploadée',
    error: 'Erreur lors de l\'upload',
    remove: 'Supprimer l\'image',
    replace: 'Remplacer l\'image',
    imageAlt: 'Image uploadée',
    noImage: 'Aucune image'
  },
  footer: {
    text: 'devjs.ch — Préparer un projet web'
  }
}
