'use client'

import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  Assignment as AssignmentIcon,
  Timeline as TimelineIcon,
  Star as StarIcon,
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

// Thème personnalisé pour le projet Simandou
const projectTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { 
    light: {
      palette: {
        primary: {
          main: '#B8202E', // Rouge du projet
        },
        secondary: {
          main: '#2D8659', // Vert du projet
        },
      }
    }, 
    dark: true 
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Navigation pour le dashboard jeune
const navigationJeune = [
  {
    segment: 'jeune/dashboard',
    title: 'Tableau de bord',
    icon: <DashboardIcon />,
  },
  {
    segment: 'jeune/profil',
    title: 'Mon profil',
    icon: <PersonIcon />,
  },
  {
    segment: 'jeune/offres',
    title: 'Rechercher des offres',
    icon: <SearchIcon />,
  },
  {
    segment: 'jeune/candidatures',
    title: 'Mes candidatures',
    icon: <AssignmentIcon />,
  },
  {
    segment: 'jeune/parcours',
    title: 'Mon parcours',
    icon: <TimelineIcon />,
  },
  {
    segment: 'jeune/evaluations',
    title: 'Mes évaluations',
    icon: <StarIcon />,
  },
  {
    segment: 'jeune/notifications',
    title: 'Notifications',
    icon: <NotificationsIcon />,
  },
  {
    segment: 'messages',
    title: 'Messages',
    icon: <MessageIcon />,
  },
  {
    segment: 'parametres',
    title: 'Paramètres',
    icon: <SettingsIcon />,
  },
];

// Router personnalisé pour Next.js
function useNextRouter() {
  const router = useRouter();
  const pathname = usePathname();

  return React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path: string) => router.push(`/jeune/${path}`),
  }), [pathname, router]);
}

interface LayoutDashboardJeuneProps {
  children: React.ReactNode;
}

export default function LayoutDashboardJeune({ children }: LayoutDashboardJeuneProps) {
  const router = useNextRouter();

  return (
    <AppProvider
      navigation={navigationJeune}
      router={router}
      theme={projectTheme}
      branding={{
        title: 'Simandou 2040',
        logo: (
          <div style={{ 
            width: 32, 
            height: 32, 
            backgroundColor: '#dc2626', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            S40
          </div>
        ),
      }}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              margin: '8px'
            }}>
              <div style={{
                width: 8,
                height: 8,
                backgroundColor: '#16a34a',
                borderRadius: '50%'
              }} />
              <span style={{ fontSize: '14px', color: '#374151' }}>
                Profil à 75% complété
              </span>
            </div>
          ),
        }}
      >
        {children}
      </DashboardLayout>
    </AppProvider>
  );
}