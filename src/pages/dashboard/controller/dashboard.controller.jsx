import { DashboardView } from '../view/dashboard.view';

export function DashboardController() {
    // Dados mockados para o dashboard
    const dashboardData = {
        metrics: {
            orders: {
                value: 38,
                trend: '+7%',
                isPositive: true
            },
            loyalCustomers: {
                value: 24,
                trend: '-2%',
                isPositive: false
            }
        },
        bestSellers: {
            cakes: {
                decorations: [
                    { name: 'Morango', quantity: 50, trend: '+12%', isPositive: true },
                    { name: 'Ameixas', quantity: 46, trend: '+5%', isPositive: true },
                    { name: 'Geleia', quantity: 39, trend: '-1%', isPositive: false }
                ],
                fillings: [
                    { name: 'Morango', quantity: 50, trend: '+12%', isPositive: true },
                    { name: 'Ameixas', quantity: 46, trend: '+5%', isPositive: true },
                    { name: 'Geleia', quantity: 39, trend: '-1%', isPositive: false }
                ],
                addons: [
                    { name: 'Morango', quantity: 50, trend: '+12%', isPositive: true },
                    { name: 'Ameixas', quantity: 46, trend: '+5%', isPositive: true },
                    { name: 'Geleia', quantity: 39, trend: '-1%', isPositive: false }
                ]
            },
            complements: {
                // Dados para complementares quando a tab for selecionada
            }
        }
    };

    return (
        <DashboardView data={dashboardData} />
    );
}
