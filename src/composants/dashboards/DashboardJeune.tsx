'use client'

import * as React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  LinearProgress,
  Button,
  Alert,
  Divider
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon
} from '@mui/icons-material';

// Données d'exemple pour le dashboard
const dashboardData = {
  stats: {
    candidatures: 8,
    enCours: 3,
    noteMoyenne: 4.2,
    formations: 2
  },
  profile: {
    completion: 75,
    name: "Amadou Diallo",
    lastLogin: "Il y a 2 heures"
  },
  recentActivities: [
    { id: 1, type: 'candidature', title: 'Candidature envoyée chez TechCorp', date: '2 heures' },
    { id: 2, type: 'formation', title: 'Formation Savoir-être complétée', date: '1 jour' },
    { id: 3, type: 'evaluation', title: 'Nouvelle évaluation reçue (4.5/5)', date: '3 jours' }
  ],
  opportunities: [
    { id: 1, title: 'Stage Développeur Junior', company: 'InnovTech', location: 'Conakry' },
    { id: 2, title: 'Formation React.js', company: 'Digital Academy', location: 'En ligne' }
  ]
};

export default function DashboardPageContent() {
  return (
    <Box sx={{ p: 3 }}>
      {/* En-tête de bienvenue */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Bonjour, {dashboardData.profile.name} 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Dernière connexion : {dashboardData.profile.lastLogin}
        </Typography>
      </Box>

      {/* Alerte de progression du profil */}
      <Alert 
        severity="info" 
        sx={{ mb: 3 }}
        action={
          <Button color="inherit" size="small">
            Compléter
          </Button>
        }
      >
        Votre profil est complété à {dashboardData.profile.completion}%. 
        Ajoutez votre CV et vos compétences pour améliorer votre visibilité !
      </Alert>

      {/* Statistiques principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <AssignmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                    {dashboardData.stats.candidatures}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Candidatures
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <TrendingUpIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                    {dashboardData.stats.enCours}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    En cours
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <StarIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                    {dashboardData.stats.noteMoyenne}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Note moyenne
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <NotificationsIcon />
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                    {dashboardData.stats.formations}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Formations
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Progression du profil */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Progression du profil" />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Complété</Typography>
                  <Typography variant="body2">{dashboardData.profile.completion}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={dashboardData.profile.completion} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Ajoutez votre CV, vos compétences et votre photo pour un profil complet.
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                sx={{ mt: 2 }}
                fullWidth
              >
                Compléter mon profil
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Activités récentes */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Activités récentes" />
            <CardContent>
              {dashboardData.recentActivities.map((activity, index) => (
                <Box key={activity.id}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {activity.title}
                    </Typography>
                    <Chip 
                      label={`Il y a ${activity.date}`} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                  {index < dashboardData.recentActivities.length - 1 && (
                    <Divider sx={{ my: 1 }} />
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Opportunités recommandées */}
        <Grid item xs={12}>
          <Card>
            <CardHeader 
              title="Opportunités recommandées pour vous" 
              action={
                <Button variant="outlined" size="small">
                  Voir tout
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                {dashboardData.opportunities.map((opportunity) => (
                  <Grid item xs={12} md={6} key={opportunity.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {opportunity.title}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                          {opportunity.company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          📍 {opportunity.location}
                        </Typography>
                        <Button variant="contained" size="small" sx={{ mt: 2 }}>
                          Postuler
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}