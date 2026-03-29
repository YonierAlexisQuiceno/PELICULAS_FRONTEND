import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaPlayCircle, FaUserTie, FaTags, FaFilm } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import mediaService from '../services/mediaService';
import directorService from '../services/directorService';
import generoService from '../services/generoService';

const data = [
    { name: 'Lun', value: 4000 },
    { name: 'Mar', value: 3000 },
    { name: 'Mié', value: 2000 },
    { name: 'Jue', value: 2780 },
    { name: 'Vie', value: 1890 },
    { name: 'Sáb', value: 2390 },
    { name: 'Dom', value: 3490 },
];

const Dashboard = () => {
    const [stats, setStats] = useState({ medias: null, directores: null, generosActivos: null });
    const [recentMedia, setRecentMedia] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [medias, directores, generosActivos] = await Promise.all([
                    mediaService.getAll(),
                    directorService.getAll(),
                    generoService.getActive(),
                ]);
                setStats({
                    medias: medias?.length || 0,
                    directores: directores?.length || 0,
                    generosActivos: generosActivos?.length || 0,
                });
                setRecentMedia(Array.isArray(medias) ? [...medias].reverse().slice(0, 4) : []);
            } catch (error) {
                console.error('Error cargando estadísticas del dashboard', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="container-fluid p-0">

            {/* ── Header ── */}
            <div className="mb-4">
                <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: '4px' }}>Resumen General</h2>
                <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.9rem' }}>
                    Bienvenido, Administrador. Aquí está el estado actual de la plataforma.
                </p>
            </div>

            {/* ── Stat Cards ── */}
            <div className="row g-4 mb-4">
                {[
                    {
                        icon: <FaPlayCircle size={20} color="#1e75ff" />,
                        bg: 'rgba(30, 117, 255, 0.15)',
                        label: 'Total Películas / Series',
                        value: stats.medias,
                        badgeText: '↗ Registros',
                        badgeColor: '#22c55e',
                        badgeBg: 'rgba(34,197,94,0.12)',
                    },
                    {
                        icon: <FaUserTie size={20} color="#a78bfa" />,
                        bg: 'rgba(139, 92, 246, 0.2)',
                        label: 'Total Directores',
                        value: stats.directores,
                        badgeText: '↗ Activos',
                        badgeColor: '#22c55e',
                        badgeBg: 'rgba(34,197,94,0.12)',
                    },
                    {
                        icon: <FaTags size={20} color="#fcd34d" />,
                        bg: 'rgba(245, 158, 11, 0.2)',
                        label: 'Géneros Activos',
                        value: stats.generosActivos,
                        badgeText: '— 0%',
                        badgeColor: '#9ca3af',
                        badgeBg: 'rgba(156,163,175,0.1)',
                    },
                ].map((card, i) => (
                    <div className="col-md-4" key={i}>
                        <div style={{
                            backgroundColor: '#161d2f',
                            border: '1px solid #2e364f',
                            borderRadius: '12px',
                            padding: '20px',
                            height: '100%',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div style={{ backgroundColor: card.bg, borderRadius: '8px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {card.icon}
                                </div>
                                <span style={{
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    color: card.badgeColor,
                                    backgroundColor: card.badgeBg,
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                }}>
                                    {card.badgeText}
                                </span>
                            </div>
                            <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginBottom: '6px' }}>{card.label}</div>
                            {loading ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                    <div className="spinner-border spinner-border-sm text-primary" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                    <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Cargando...</span>
                                </div>
                            ) : (
                                <div style={{ color: '#fff', fontSize: '1.9rem', fontWeight: 700, lineHeight: 1 }}>
                                    {card.value?.toLocaleString('es-CO') ?? '—'}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Chart + Recent Media ── */}
            <div className="row g-4">

                {/* Chart */}
                <div className="col-lg-8">
                    <div style={{
                        backgroundColor: '#161d2f',
                        border: '1px solid #2e364f',
                        borderRadius: '12px',
                        padding: '24px',
                        height: '100%',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h5 style={{ color: '#fff', fontWeight: 700, margin: 0 }}>Analítica de Reproducciones</h5>
                            <select
                                className="form-select form-select-sm"
                                style={{ width: 'auto', backgroundColor: 'rgba(255,255,255,0.05)', borderColor: '#2e364f', color: '#9ca3af', fontSize: '0.82rem' }}
                            >
                                <option>Últimos 7 días</option>
                                <option>Últimos 30 días</option>
                                <option>Este año</option>
                            </select>
                        </div>
                        <div style={{ height: '280px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e364f" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: '#161d2f', borderColor: '#2e364f', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ color: '#9ca3af' }}
                                    />
                                    <Bar dataKey="value" fill="#1e75ff" radius={[4, 4, 0, 0]} barSize={35} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Recent Media */}
                <div className="col-lg-4">
                    <div style={{
                        backgroundColor: '#161d2f',
                        border: '1px solid #2e364f',
                        borderRadius: '12px',
                        padding: '24px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <h5 style={{ color: '#fff', fontWeight: 700, marginBottom: '20px' }}>Últimas Entradas</h5>

                        <div style={{ flex: 1 }}>
                            {loading ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div className="spinner-border spinner-border-sm text-primary" role="status" />
                                    <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Cargando...</span>
                                </div>
                            ) : recentMedia.length === 0 ? (
                                <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>No hay registros de media aún.</p>
                            ) : (
                                recentMedia.map((item, idx) => (
                                    <div key={item._id || idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                        {/* thumbnail */}
                                        {item.imagenPortada ? (
                                            <img
                                                src={item.imagenPortada}
                                                alt={item.titulo}
                                                style={{ width: '36px', height: '52px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                                            />
                                        ) : (
                                            <div style={{
                                                width: '36px', height: '52px', flexShrink: 0,
                                                backgroundColor: 'rgba(30,117,255,0.15)',
                                                borderRadius: '6px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <FaFilm size={14} color="#1e75ff" />
                                            </div>
                                        )}
                                        {/* info */}
                                        <div style={{ overflow: 'hidden' }}>
                                            <div style={{
                                                color: '#fff', fontWeight: 600, fontSize: '0.88rem',
                                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                maxWidth: '190px',
                                            }}>
                                                {item.titulo}
                                            </div>
                                            <div style={{ color: '#9ca3af', fontSize: '0.78rem', marginTop: '2px' }}>
                                                {item.genero?.nombre || item.genero || 'Sin género'} · {item.anioEstreno || '—'}
                                            </div>
                                            <span style={{
                                                display: 'inline-block', marginTop: '4px',
                                                fontSize: '0.7rem', fontWeight: 700,
                                                color: '#1e75ff',
                                                backgroundColor: 'rgba(30,117,255,0.12)',
                                                padding: '2px 8px', borderRadius: '4px',
                                            }}>
                                                {item.tipo?.nombre || item.tipo || 'Media'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div style={{ borderTop: '1px solid #2e364f', paddingTop: '16px', textAlign: 'center', marginTop: '8px' }}>
                            <Link to="/admin/medias" style={{ color: '#1e75ff', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem' }}>
                                Ver toda la biblioteca →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Footer ── */}
            <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '12px', color: '#6b7280', fontSize: '0.78rem' }}>
                StreamAdmin © {new Date().getFullYear()}. Todos los registros del sistema están encriptados.
            </div>
        </div>
    );
};

export default Dashboard;
