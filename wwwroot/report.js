class EnhancedSalesReport {
    constructor() {
        this.currentPeriod = "overall";
        this.charts = {};
        this.mockData = this.generateMockData();
        this.init();
    }

    generateMockData() {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        const categories = [
            "T-Shirts",
            "Jeans",
            "Dresses",
            "Accessories",
            "Shoes",
        ];

        return {
            revenue: {
                monthly: [890, 1240, 2145, 1650, 980, 1422],
                yearly: [5200, 6327, 7890], // 2023, 2024, 2025 (partial)
                labels: {
                    monthly: months,
                    yearly: ["2023", "2024", "2025"],
                },
            },
            products: {
                categories: [15, 20, 12, 8, 8], // Sales count per category
                labels: categories,
            },
            customers: {
                new: [2, 3, 4, 2, 1, 3],
                returning: [3, 4, 6, 5, 4, 5],
                labels: months,
            },
        };
    }

    init() {
        this.bindEvents();
        this.createCharts();
        this.updateSalesReport();
    }

    bindEvents() {
        document.querySelectorAll(".period-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                document
                    .querySelectorAll(".period-btn")
                    .forEach((b) => b.classList.remove("active"));
                e.target.classList.add("active");
                this.currentPeriod = e.target.dataset.period;
                this.updateCharts();
            });
        });
    }

    createCharts() {
        this.createRevenueChart();
        this.createProductChart();
        this.createCustomerChart();
    }

    createRevenueChart() {
        const ctx = document.getElementById("revenueChart").getContext("2d");
        this.charts.revenue = new Chart(ctx, {
            type: "line",
            data: {
                labels: this.mockData.revenue.labels.monthly,
                datasets: [
                    {
                        label: "Revenue ($)",
                        data: this.mockData.revenue.monthly,
                        borderColor: "#007bff",
                        backgroundColor: "rgba(0, 123, 255, 0.1)",
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: "#007bff",
                        pointBorderColor: "#fff",
                        pointBorderWidth: 2,
                        pointRadius: 6,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return "$" + value;
                            },
                        },
                    },
                },
            },
        });
    }

    createProductChart() {
        const ctx = document.getElementById("productChart").getContext("2d");
        this.charts.product = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: this.mockData.products.labels,
                datasets: [
                    {
                        data: this.mockData.products.categories,
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#4BC0C0",
                            "#9966FF",
                        ],
                        borderWidth: 2,
                        borderColor: "#fff",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                        },
                    },
                },
            },
        });
    }

    createCustomerChart() {
        const ctx = document.getElementById("customerChart").getContext("2d");
        this.charts.customer = new Chart(ctx, {
            type: "bar",
            data: {
                labels: this.mockData.customers.labels,
                datasets: [
                    {
                        label: "New Customers",
                        data: this.mockData.customers.new,
                        backgroundColor: "#28a745",
                        borderRadius: 4,
                    },
                    {
                        label: "Returning Customers",
                        data: this.mockData.customers.returning,
                        backgroundColor: "#17a2b8",
                        borderRadius: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
                scales: {
                    x: {
                        stacked: false,
                    },
                    y: {
                        beginAtZero: true,
                        stacked: false,
                    },
                },
            },
        });
    }

    updateCharts() {
        switch (this.currentPeriod) {
            case "yearly":
                this.charts.revenue.data.labels =
                    this.mockData.revenue.labels.yearly;
                this.charts.revenue.data.datasets[0].data =
                    this.mockData.revenue.yearly;
                break;
            case "monthly":
                this.charts.revenue.data.labels =
                    this.mockData.revenue.labels.monthly;
                this.charts.revenue.data.datasets[0].data =
                    this.mockData.revenue.monthly;
                break;
            default: // overall
                this.charts.revenue.data.labels =
                    this.mockData.revenue.labels.monthly;
                this.charts.revenue.data.datasets[0].data =
                    this.mockData.revenue.monthly;
        }

        this.charts.revenue.update();
        this.updateSummaryCards();
    }

    updateSummaryCards() {
        const summaryData = {
            overall: {
                growth: "+15.2%",
                bestMonth: "March",
                avgMonthly: "$1,054",
            },
            yearly: {
                growth: "+21.7%",
                bestMonth: "2024",
                avgMonthly: "$6,472",
            },
            monthly: {
                growth: "+8.3%",
                bestMonth: "March",
                avgMonthly: "$1,054",
            },
        };

        const data = summaryData[this.currentPeriod];
        document.getElementById("revenue-growth").textContent = data.growth;
        document.getElementById("best-month").textContent = data.bestMonth;
        document.getElementById("avg-monthly").textContent = data.avgMonthly;
    }

    async updateSalesReport() {
        try {
            // Your existing API call would go here
            // const salesData = await this.fetchSalesReport();

            // For demo, using mock data
            const salesData = {
                totalRevenue: 6327.53,
                averageOrderValue: 301.31,
                totalProductsSold: 63,
                activeCustomers: 8,
            };

            document.getElementById("total-revenue").textContent =
                salesData.totalRevenue.toFixed(2);
            document.getElementById("avg-order-value").textContent =
                salesData.averageOrderValue.toFixed(2);
            document.getElementById("total-products-sold").textContent =
                salesData.totalProductsSold;
            document.getElementById("active-customers").textContent =
                salesData.activeCustomers;
        } catch (error) {
            console.error("Error updating sales report:", error);
            // Your existing fallback calculation
        }
    }
}

// Initialize the enhanced sales report
document.addEventListener("DOMContentLoaded", () => {
    new EnhancedSalesReport();
});