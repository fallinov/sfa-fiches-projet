export default {
  app: {
    title: 'ESIG — Fiche de cadrage projet web',
    subtitle: 'Phase 1 — Clarification du projet'
  },
  header: {
    lastName: 'Nom',
    lastNamePlaceholder: 'Dupont',
    firstName: 'Prénom',
    firstNamePlaceholder: 'Marie',
    date: 'Date de création'
  },
  sections: {
    objective: {
      title: '1. Objectif du projet',
      mainObjective: 'Objectif principal',
      mainObjectiveHint: 'Décrivez l\'objectif principal de votre projet en une phrase claire et mesurable.',
      mainObjectivePlaceholder: 'Ex : Créer un site vitrine pour un salon de coiffure permettant la prise de rendez-vous en ligne.',
      projectName: 'Nom du projet',
      projectNamePlaceholder: 'Ex : CoiffurePro'
    },
    personas: {
      title: '2. Personas (utilisateurs cibles)',
      add: '+ Ajouter un persona',
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
      goal: 'Objectif principal sur le site',
      goalPlaceholder: 'Que cherche cette personne en visitant votre site ?',
      frustrations: 'Frustrations potentielles',
      frustrationsPlaceholder: 'Qu\'est-ce qui pourrait l\'agacer ou la bloquer ?'
    },
    features: {
      title: '3. Fonctionnalités (MoSCoW)',
      add: '+ Ajouter une fonctionnalité',
      columnNumber: '#',
      columnFeature: 'Fonctionnalité',
      columnPriority: 'Priorité',
      descriptionPlaceholder: 'Décrire la fonctionnalité…',
      priorityPlaceholder: '—',
      priorities: {
        must: 'Must',
        should: 'Should',
        could: 'Could',
        wont: 'Won\'t'
      }
    },
    constraints: {
      title: '4. Contraintes',
      deadline: 'Date de livraison',
      hours: 'Heures disponibles',
      hoursPlaceholder: 'Ex : 40',
      tech: 'Technologies imposées',
      techPlaceholder: 'Ex : HTML, CSS, JavaScript',
      accessibility: 'Niveau d\'accessibilité',
      accessibilityPlaceholder: 'Non défini',
      accessibilityOptions: {
        a: 'WCAG A',
        aa: 'WCAG AA',
        aaa: 'WCAG AAA'
      },
      legal: 'Contraintes légales',
      legalPlaceholder: 'Ex : RGPD, mentions légales, droit à l\'image…'
    },
    criteria: {
      title: '5. Critères de succès',
      description: 'Comment saurez-vous que le projet est réussi ?',
      hint: 'Définissez des critères concrets et vérifiables.',
      add: '+ Ajouter un critère',
      textPlaceholder: 'Ex : Le site est accessible sur mobile et desktop'
    }
  },
  actions: {
    copyLink: 'Copier le lien',
    download: 'Télécharger',
    import: 'Importer',
    reset: 'Réinitialiser',
    saved: 'Sauvegardé'
  },
  toasts: {
    saved: 'Sauvegardé',
    linkCopied: 'Lien copié dans le presse-papier !',
    downloaded: 'Fiche téléchargée !',
    imported: 'Fiche importée avec succès !',
    importError: 'Erreur : le fichier n\'est pas un JSON valide.',
    loadedFromLink: 'Fiche chargée depuis le lien partagé',
    reset: 'Fiche réinitialisée'
  },
  modals: {
    resetTitle: 'Réinitialiser la fiche',
    resetDescription: 'Effacer tous les champs ? Cette action est irréversible.',
    resetConfirm: 'Réinitialiser',
    resetCancel: 'Annuler'
  },
  footer: {
    text: 'devjs.ch — Phase 1 : Clarification du projet'
  }
}
