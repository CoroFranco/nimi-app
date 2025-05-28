"use client"

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  Calendar,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  Sparkles,
  Filter,
  ChevronDown,
  Search,
  Bell,
  User,
  RefreshCw,
  Brain,
  Edit3,
  TrendingUp
} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const SocialSchedulerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isGeneratingContent, setIsGeneratingContent] = useState<boolean>(false);
  const user = useUser();

  // Aquí se cargará dinámicamente el contenido de stats desde la API
  const stats = null;

  // Aquí se cargará dinámicamente el contenido de publicaciones recientes desde la API
  const recentPosts = [];

  // Aquí se cargará dinámicamente el contenido de próximas publicaciones desde la API
  const upcomingPosts = [];

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'ai-content', name: 'Contenido IA', icon: Sparkles },
    { id: 'calendar', name: 'Calendario', icon: Calendar },
    { id: 'content', name: 'Biblioteca', icon: Edit3 },
    { id: 'analytics', name: 'Analíticas', icon: TrendingUp },
    { id: 'audience', name: 'Audiencia', icon: Users },
    { id: 'messages', name: 'Mensajes', icon: MessageSquare },
    { id: 'settings', name: 'Configuración', icon: Settings }
  ];

  const handleGenerateContent = async (): Promise<void> => {
    setIsGeneratingContent(true);
    // Aquí se llamará a la API para generar contenido con IA
    setTimeout(() => {
      setIsGeneratingContent(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6 flex flex-col gap-4 bg-gradient-to-r from-emerald-500 to-emerald-600">
          <h1 className="text-2xl font-bold text-white text-center">Nimi</h1>
          <div className="flex flex-col items-center gap-3">
            <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '48px',
                      height: '48px',
                    },
                  },
                }}
              />
              <p className="text-xl">{user.user?.firstName}</p>
          </div>   
        </div>

        <nav className="mt-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="flex-1">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 m-4 rounded-lg">
          <h4 className="text-white font-medium text-sm mb-2">IA Rápida</h4>
          <button
            onClick={handleGenerateContent}
            disabled={isGeneratingContent}
            className="w-full bg-white/20 hover:bg-white/30 text-white text-xs py-2 px-3 rounded-md transition-colors flex items-center justify-center disabled:opacity-50"
          >
            {isGeneratingContent ? (
              <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <Brain className="w-3 h-3 mr-1" />
            )}
            {isGeneratingContent ? 'Generando...' : 'Generar Contenido'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <div className="relative">
                  <select className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option>Todas las plataformas</option>
                    {/* Aquí se cargarán dinámicamente las opciones de plataformas */}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar contenido..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-emerald-700 flex items-center transition-all shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Crear con IA
              </button>
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-gray-50 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Aquí se mostrarán las tarjetas de stats dinámicamente */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center text-gray-400">Stats Cards</div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Publicaciones Recientes</h3>
            {/* Aquí se mostrarán dinámicamente las publicaciones recientes */}
            <div className="text-center text-gray-400">Sin publicaciones cargadas</div>
          </div>

          {/* Upcoming Posts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Próximas Publicaciones</h3>
            {/* Aquí se mostrarán dinámicamente las próximas publicaciones */}
            <div className="text-center text-gray-400">Sin próximas publicaciones</div>
          </div>

          {/* AI Content Generator Panel */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-sm p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Generador de Contenido IA</h3>
            {/* Aquí se integrarán dinámicamente las funciones de generación IA */}
            <div className="text-emerald-100">Panel listo para IA</div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
            {/* Aquí se integrarán dinámicamente las acciones rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-xl text-gray-400"
                >
                  Acción {idx + 1}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SocialSchedulerDashboard;
