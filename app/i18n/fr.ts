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
    date: 'Date de création'
  },
  sections: {
    objective: {
      title: '1. Objectif du projet',
      description: 'Définissez clairement ce que votre projet doit accomplir.',
      mainObjective: 'Objectif principal',
      mainObjectiveHint: 'Une phrase claire et mesurable qui résume le but du projet.',
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
      textPlaceholder: 'Ex : Le site est accessible sur mobile et desktop'
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
        add: 'Ajouter une carte'
      },
      participants: {
        title: '2. Participants',
        description: 'Notez les personnes qui ont participé au tri (minimum 5 recommandé).',
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
        description: 'Identifiez les groupes récurrents formés par les participants.',
        groupLabel: 'Groupe',
        groupName: 'Nom du groupe',
        groupNamePlaceholder: 'Ex : Navigation principale',
        groupCards: 'Cartes dans ce groupe',
        groupCardsPlaceholder: 'Listez les cartes regroupées ici (une par ligne)',
        add: 'Ajouter un groupe'
      },
      architecture: {
        title: '4. Architecture de navigation',
        description: 'Décrivez la structure de navigation finale de votre site.',
        label: 'Structure de navigation',
        placeholder: 'Décrivez l\'arborescence du site basée sur les résultats du tri.\n\nEx :\n- Accueil\n- Services\n  - Coupe\n  - Coloration\n- Rendez-vous\n- Contact'
      },
      checklist: {
        title: '5. Checklist de validation',
        description: 'Vérifiez que toutes les étapes du card sorting ont été réalisées.'
      }
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
    progress: '{filled}/{total} sections'
  },
  validation: {
    lastNameRequired: 'Le nom est obligatoire.',
    objectiveRequired: 'L\'objectif principal est obligatoire.',
    projectNameRequired: 'Le nom du projet est obligatoire.',
    cardsRequired: 'Ajoutez au moins une carte avec un nom.',
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
  footer: {
    text: 'devjs.ch — Préparer un projet web'
  }
}
