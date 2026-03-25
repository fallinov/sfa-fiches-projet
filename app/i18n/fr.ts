export default {
  app: {
    title: 'Fiche de cadrage projet web',
    subtitle: 'Phase 1 — Clarification du projet',
    institution: 'ESIG'
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
      descriptionPlaceholder: 'Décrire la fonctionnalité…',
      priorityPlaceholder: '—',
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
      accessibilityPlaceholder: 'Non défini',
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
      textPlaceholder: 'Ex : Le site est accessible sur mobile et desktop'
    }
  },
  actions: {
    copyLink: 'Partager',
    copyLinkTooltip: 'Copie un lien partageable dans le presse-papier',
    download: 'Exporter JSON',
    import: 'Importer JSON',
    reset: 'Tout effacer',
    autoSaved: 'Sauvegarde auto activée'
  },
  toasts: {
    saved: 'Sauvegardé',
    linkCopied: 'Lien copié — collez-le pour partager votre fiche !',
    downloaded: 'Fiche exportée au format JSON',
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
    text: 'devjs.ch — Phase 1 : Clarification du projet'
  }
}
