using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using whole_crm.DTOs;

namespace whole_crm.Services
{
    public interface IDashboardService
    {
        Task<DashboardDto> GetDashboardDataAsync();
    }
}