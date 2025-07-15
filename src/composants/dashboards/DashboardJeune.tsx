'use client'

import * as React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Chip,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress
} from '@mui/material';
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Psychology as SkillsIcon,
  Description as DocumentIcon,
  PhotoCamera as PhotoCameraIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CloudUpload as UploadIcon,
  Visibility as ViewIcon,
  EmojiEvents as TrophyIcon,
  School as SchoolIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

// Données d'exemple pour le profil
const profileData = {
  user: {
    name: 'Mamadou DIALLO',
    email: 'mamadou.diallo@gmail.com',
    phone: '+224 628 12 34 56',
    dateNaissance: '1998-03-15',
    region: 'Kindia',
    niveauEducation: 'Lycée',
    secteurInteresse: 'BTP & Construction',
    disponibilite: 'Immédiatement',
    mobilite: 'Dans ma région',
    aspirations: 'Je souhaite me spécialiser dans le BTP, particulièrement dans la construction d\'infrastructures. Mon objectif est de devenir chef de chantier dans les 5 prochaines années.',
    photo: null
  },
  stats: {
    candidatures: 8,
    enCours: 3,
    noteMoyenne: 4.2,
    formations: 2,
    completion: 75
  },
  experiences: [
    {
      id: 1,
      titre: 'Ouvrier en construction',
      entreprise: 'Entreprise KABA & Fils',
      dateDebut: '2023-03',
      dateFin: '2023-09',
      description: 'Participation à la construction de bâtiments résidentiels. Maçonnerie, coffrage, et finitions. Travail en équipe sur des chantiers de 10 à 20 ouvriers.'
    },
    {
      id: 2,
      titre: 'Stage en électricité',
      entreprise: 'SOTELGUI (Stage)',
      dateDebut: '2022-07',
      dateFin: '2022-09',
      description: 'Stage de découverte des métiers de l\'électricité. Installation de câblages, maintenance d\'équipements électriques, respect des normes de sécurité.'
    }
  ],
  competencesTechniques: ['Maçonnerie', 'Coffrage', 'Soudure', 'Électricité de base'],
  competencesComportementales: ['Travail en équipe', 'Ponctualité', 'Adaptabilité'],
  langues: {
    francais: 'Courant',
    anglais: 'Débutant',
    langueNationale: 'Malinké',
    autres: ''
  },
  documents: [
    { id: 1, nom: 'Pièce d\'identité', type: 'identity', uploaded: true, filename: 'carte_identite.pdf' },
    { id: 2, nom: 'CV', type: 'cv', uploaded: true, filename: 'cv_mamadou.pdf' },
    { id: 3, nom: 'Diplômes', type: 'diplomas', uploaded: false },
    { id: 4, nom: 'Certificats', type: 'certificates', uploaded: false },
    { id: 5, nom: 'Attestations', type: 'attestations', uploaded: false },
  ],
  badges: [
    { id: 1, nom: 'Débutant', icon: '🚀', earned: true, description: 'Première candidature' },
    { id: 2, nom: 'Profil Pro', icon: '✅', earned: true, description: 'Profil complété' },
    { id: 3, nom: 'Actif', icon: '📝', earned: false, description: '5 candidatures' },
    { id: 4, nom: 'Employé', icon: '💼', earned: false, description: 'Première embauche' },
    { id: 5, nom: 'Civique', icon: '🎓', earned: true, description: 'Formation Parcours D' },
    { id: 6, nom: 'Expert', icon: '⭐', earned: false, description: 'Excellentes évaluations' },
  ]
};

export default function DashboardJeune() {
  const [tabValue, setTabValue] = React.useState(0);
  const [skills, setSkills] = React.useState<string[]>(profileData.competencesTechniques);
  const [softSkills, setSoftSkills] = React.useState<string[]>(profileData.competencesComportementales);
  const [newSkill, setNewSkill] = React.useState('');
  const [newSoftSkill, setNewSoftSkill] = React.useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddSkill = (type: 'technical' | 'soft') => {
    const skill = type === 'technical' ? newSkill : newSoftSkill;
    if (skill.trim()) {
      if (type === 'technical') {
        setSkills([...skills, skill.trim()]);
        setNewSkill('');
      } else {
        setSoftSkills([...softSkills, skill.trim()]);
        setNewSoftSkill('');
      }
    }
  };

  const handleRemoveSkill = (skillToRemove: string, type: 'technical' | 'soft') => {
    if (type === 'technical') {
      setSkills(skills.filter(skill => skill !== skillToRemove));
    } else {
      setSoftSkills(softSkills.filter(skill => skill !== skillToRemove));
    }
  };

  const formatDateRange = (start: string, end?: string) => {
    const startDate = new Date(start).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    const endDate = end ? new Date(end).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'Présent';
    return `${startDate} - ${endDate}`;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* En-tête du profil */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Profil à {profileData.stats.completion}% complété</strong> - 
          Ajoutez votre CV et vos compétences pour améliorer votre visibilité
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Sidebar du profil */}
        <Grid item size={{ xs: 12, md: 4 }}>
          <Card sx={{ mb: 2 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: 'auto',
                    background: 'linear-gradient(135deg, var(--guinea-red), var(--guinea-green))',
                    fontSize: '3rem'
                  }}
                >
                  👨‍🎓
                </Avatar>
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                  size="small"
                >
                  <PhotoCameraIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="h6" gutterBottom>
                {profileData.user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Jeune Simandou 2040
              </Typography>
              
              {/* Progression du profil */}
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <CircularProgress
                    variant="determinate"
                    value={profileData.stats.completion}
                    size={60}
                    thickness={6}
                    sx={{ color: '#009460' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" component="div" color="text.secondary" fontWeight="bold">
                      {profileData.stats.completion}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Profil complété
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {profileData.stats.candidatures}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Candidatures
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main" fontWeight="bold">
                      {profileData.stats.enCours}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      En cours
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main" fontWeight="bold">
                      {profileData.stats.noteMoyenne}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Note moyenne
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="info.main" fontWeight="bold">
                      {profileData.stats.formations}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Formations
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader 
              title={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrophyIcon color="primary" />
                  <Typography variant="h6">Mes badges</Typography>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={1}>
                {profileData.badges.map((badge) => (
                  <Grid item xs={4} key={badge.id}>
                    <Paper
                      sx={{
                        p: 1,
                        textAlign: 'center',
                        backgroundColor: badge.earned ? '#FCD116' : '#f5f5f5',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.05)' }
                      }}
                      title={badge.description}
                    >
                      <Typography variant="h6">{badge.icon}</Typography>
                      <Typography variant="caption" fontWeight="bold">
                        {badge.nom}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Contenu principal avec onglets */}
        <Grid item size={{ xs: 12, md: 8 }}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                <Tab icon={<PersonIcon />} label="Informations personnelles" {...a11yProps(0)} />
                <Tab icon={<WorkIcon />} label="Expérience" {...a11yProps(1)} />
                <Tab icon={<SkillsIcon />} label="Compétences" {...a11yProps(2)} />
                <Tab icon={<DocumentIcon />} label="Documents" {...a11yProps(3)} />
              </Tabs>
            </Box>

            {/* Onglet Informations personnelles */}
            <TabPanel value={tabValue} index={0}>
              <Box component="form">
                <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <PersonIcon />
                  Informations de base
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nom"
                      value={profileData.user.name.split(' ')[1]}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Prénom"
                      value={profileData.user.name.split(' ')[0]}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={profileData.user.email}
                      InputProps={{ 
                        readOnly: true,
                        startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Téléphone"
                      value={profileData.user.phone}
                      InputProps={{ 
                        startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date de naissance"
                      type="date"
                      value={profileData.user.dateNaissance}
                      InputProps={{ 
                        readOnly: true,
                        startAdornment: <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Région</InputLabel>
                      <Select
                        value={profileData.user.region.toLowerCase()}
                        label="Région"
                        startAdornment={<LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                      >
                        <MenuItem value="kindia">Kindia</MenuItem>
                        <MenuItem value="conakry">Conakry</MenuItem>
                        <MenuItem value="boke">Boké</MenuItem>
                        <MenuItem value="labe">Labé</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <SchoolIcon />
                  Formation et aspirations
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Niveau d'éducation</InputLabel>
                      <Select value="lycee" label="Niveau d'éducation">
                        <MenuItem value="lycee">Lycée</MenuItem>
                        <MenuItem value="universitaire">Universitaire</MenuItem>
                        <MenuItem value="formation_pro">Formation professionnelle</MenuItem>
                        <MenuItem value="college">Collège</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Secteur d'intérêt</InputLabel>
                      <Select value="btp" label="Secteur d'intérêt">
                        <MenuItem value="btp">BTP & Construction</MenuItem>
                        <MenuItem value="agro">Agro-industrie</MenuItem>
                        <MenuItem value="numerique">Services numériques</MenuItem>
                        <MenuItem value="logistique">Logistique & Transport</MenuItem>
                        <MenuItem value="maintenance">Maintenance industrielle</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Disponibilité</InputLabel>
                      <Select value="immediat" label="Disponibilité">
                        <MenuItem value="immediat">Immédiatement</MenuItem>
                        <MenuItem value="1_mois">Dans 1 mois</MenuItem>
                        <MenuItem value="3_mois">Dans 3 mois</MenuItem>
                        <MenuItem value="flexible">Flexible</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Mobilité géographique</InputLabel>
                      <Select value="region" label="Mobilité géographique">
                        <MenuItem value="region">Dans ma région</MenuItem>
                        <MenuItem value="nationale">National</MenuItem>
                        <MenuItem value="limitee">Limitée</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Aspirations professionnelles"
                      multiline
                      rows={4}
                      value={profileData.user.aspirations}
                      placeholder="Décrivez vos objectifs de carrière, le type de poste que vous recherchez..."
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button variant="contained" startIcon={<EditIcon />}>
                    Sauvegarder les modifications
                  </Button>
                  <Button variant="outlined">
                    Annuler
                  </Button>
                </Box>
              </Box>
            </TabPanel>

            {/* Onglet Expérience */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkIcon />
                  Expérience professionnelle
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                  Ajouter une expérience
                </Button>
              </Box>

              <List>
                {profileData.experiences.map((exp, index) => (
                  <React.Fragment key={exp.id}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        mb: 2,
                        border: '1px solid',
                        borderColor: 'grey.200'
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography variant="h6" color="primary">
                                {exp.titre}
                              </Typography>
                              <Typography variant="subtitle2" color="text.secondary">
                                {exp.entreprise}
                              </Typography>
                            </Box>
                            <Chip
                              label={formatDateRange(exp.dateDebut, exp.dateFin)}
                              variant="outlined"
                              size="small"
                            />
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {exp.description}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton size="small" color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>

              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  border: '2px dashed',
                  borderColor: 'primary.main',
                  bgcolor: 'primary.50',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'primary.100' }
                }}
              >
                <AddIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" color="primary">
                  Ajouter une nouvelle expérience
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Même les expériences informelles comptent !
                </Typography>
              </Paper>
            </TabPanel>

            {/* Onglet Compétences */}
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <SkillsIcon />
                Compétences techniques
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={() => handleRemoveSkill(skill, 'technical')}
                      sx={{ 
                        background: 'linear-gradient(45deg, #CE1126, #009460)',
                        color: 'white',
                        '& .MuiChip-deleteIcon': { color: 'white' }
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Ajouter une compétence technique..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill('technical')}
                    sx={{ flexGrow: 1 }}
                  />
                  <Button variant="outlined" onClick={() => handleAddSkill('technical')}>
                    Ajouter
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
                💪 Compétences comportementales
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {softSkills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={() => handleRemoveSkill(skill, 'soft')}
                      sx={{ 
                        background: 'linear-gradient(45deg, #009460, #00b070)',
                        color: 'white',
                        '& .MuiChip-deleteIcon': { color: 'white' }
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Ajouter une compétence comportementale..."
                    value={newSoftSkill}
                    onChange={(e) => setNewSoftSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill('soft')}
                    sx={{ flexGrow: 1 }}
                  />
                  <Button variant="outlined" onClick={() => handleAddSkill('soft')}>
                    Ajouter
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
                🗣️ Langues
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Français</InputLabel>
                    <Select value="courant" label="Français">
                      <MenuItem value="debutant">Débutant</MenuItem>
                      <MenuItem value="intermediaire">Intermédiaire</MenuItem>
                      <MenuItem value="courant">Courant</MenuItem>
                      <MenuItem value="natif">Natif</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Anglais</InputLabel>
                    <Select value="debutant" label="Anglais">
                      <MenuItem value="debutant">Débutant</MenuItem>
                      <MenuItem value="intermediaire">Intermédiaire</MenuItem>
                      <MenuItem value="courant">Courant</MenuItem>
                      <MenuItem value="natif">Natif</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Langue nationale principale</InputLabel>
                    <Select value="malinke" label="Langue nationale principale">
                      <MenuItem value="malinke">Malinké</MenuItem>
                      <MenuItem value="soussou">Soussou</MenuItem>
                      <MenuItem value="poular">Poular</MenuItem>
                      <MenuItem value="guerze">Guerzé</MenuItem>
                      <MenuItem value="toma">Toma</MenuItem>
                      <MenuItem value="kissi">Kissi</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Autres langues"
                    placeholder="Arabe, Espagnol..."
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Button variant="contained">
                  Sauvegarder les compétences
                </Button>
              </Box>
            </TabPanel>

            {/* Onglet Documents */}
            <TabPanel value={tabValue} index={3}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <DocumentIcon />
                Mes documents
              </Typography>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                Téléchargez vos documents pour améliorer votre profil et augmenter vos chances de recrutement.
              </Alert>

              <Grid container spacing={2}>
                {profileData.documents.map((doc) => (
                  <Grid item xs={12} sm={6} md={4} key={doc.id}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        cursor: 'pointer',
                        border: doc.uploaded ? '2px solid #009460' : '2px dashed #ccc',
                        bgcolor: doc.uploaded ? 'success.50' : 'grey.50',
                        '&:hover': { 
                          borderColor: doc.uploaded ? 'success.dark' : 'primary.main',
                          bgcolor: doc.uploaded ? 'success.100' : 'primary.50'
                        }
                      }}
                    >
                      {doc.uploaded && (
                        <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 0.5 }}>
                          <IconButton size="small" color="primary">
                            <ViewIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                      
                      <Box sx={{ position: 'relative' }}>
                        <DocumentIcon sx={{ fontSize: 48, color: doc.uploaded ? 'success.main' : 'text.secondary', mb: 1 }} />
                        <Typography variant="subtitle2" fontWeight="bold">
                          {doc.nom}
                        </Typography>
                        <Typography variant="caption" color={doc.uploaded ? 'success.main' : 'text.secondary'}>
                          {doc.uploaded ? `✅ ${doc.filename}` : '📤 Cliquez pour télécharger'}
                        </Typography>
                        
                        {!doc.uploaded && (
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<UploadIcon />}
                            sx={{ mt: 1 }}
                            component="label"
                          >
                            Télécharger
                            <input type="file" hidden accept=".pdf,.jpg,.png,.doc,.docx" />
                          </Button>
                        )}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Alert severity="success" sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  💡 Conseils pour vos documents
                </Typography>
                <ul style={{ marginLeft: 20 }}>
                  <li>Formats acceptés : PDF, JPG, PNG, DOC, DOCX</li>
                  <li>Taille maximum : 10MB par fichier</li>
                  <li>Assurez-vous que vos documents sont lisibles</li>
                  <li>Un CV à jour augmente vos chances de 70%</li>
                </ul>
              </Alert>
            </TabPanel>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}