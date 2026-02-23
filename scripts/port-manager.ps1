# Port Management Script for Hugo Development
# Save as: port-manager.ps1

function Check-DevelopmentPorts {
    Write-Host "=== Development Port Status ===" -ForegroundColor Cyan
    $ports = @(1313, 3000, 8080, 8000, 4000, 5000, 3001)
    
    foreach ($port in $ports) {
        $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        
        if ($connections) {
            foreach ($conn in $connections) {
                try {
                    $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
                    Write-Host "Port $port - IN USE" -ForegroundColor Red
                    Write-Host "  Process: $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor White
                    Write-Host "  Command: $($process.Path)" -ForegroundColor Gray
                } catch {
                    Write-Host "Port $port - IN USE (Unknown process)" -ForegroundColor Red
                }
            }
        } else {
            Write-Host "Port $port - Available" -ForegroundColor Green
        }
    }
}

function Kill-PortProcess {
    param([int]$Port)
    
    Write-Host "Attempting to free port $Port..." -ForegroundColor Yellow
    
    $connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    
    if ($connections) {
        foreach ($conn in $connections) {
            try {
                $process = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
                Write-Host "Killing process: $($process.ProcessName) (PID: $($process.Id))" -ForegroundColor Red
                Stop-Process -Id $conn.OwningProcess -Force
                Write-Host "Process killed successfully" -ForegroundColor Green
            } catch {
                Write-Host "Failed to kill process: $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    } else {
        Write-Host "Port $Port is already available" -ForegroundColor Green
    }
}

function Kill-Hugo {
    Write-Host "Killing all Hugo processes..." -ForegroundColor Yellow
    
    # Method 1: Kill by process name
    $hugoProcesses = Get-Process -Name "hugo" -ErrorAction SilentlyContinue
    if ($hugoProcesses) {
        $hugoProcesses | ForEach-Object {
            Write-Host "Killing Hugo process: PID $($_.Id)" -ForegroundColor Red
            Stop-Process -Id $_.Id -Force
        }
    }
    
    # Method 2: Kill by command line
    Get-WmiObject Win32_Process | Where-Object {
        $_.CommandLine -like "*hugo server*" -or $_.CommandLine -like "*hugo.exe*"
    } | ForEach-Object {
        Write-Host "Killing Hugo server process: PID $($_.ProcessId)" -ForegroundColor Red
        $_.Terminate()
    }
    
    Write-Host "Hugo cleanup complete" -ForegroundColor Green
}

function Start-Hugo {
    param([string]$Directory = ".")
    
    Write-Host "Starting Hugo server..." -ForegroundColor Cyan
    
    # Kill any existing Hugo processes first
    Kill-Hugo
    
    # Wait a moment
    Start-Sleep -Seconds 1
    
    # Start new Hugo server
    Set-Location $Directory
    Start-Process -FilePath "hugo" -ArgumentList "server", "-D", "--navigateToChanged" -NoNewWindow
    
    Write-Host "Hugo server started on http://localhost:1313" -ForegroundColor Green
}

# Export functions for use
Export-ModuleMember -Function Check-DevelopmentPorts, Kill-PortProcess, Kill-Hugo, Start-Hugo

# If run directly, show current status
if ($MyInvocation.InvocationName -ne '.') {
    Check-DevelopmentPorts
    
    Write-Host "`n=== Available Commands ===" -ForegroundColor Cyan
    Write-Host "Check-DevelopmentPorts  - Check status of common dev ports" -ForegroundColor White
    Write-Host "Kill-PortProcess 1313   - Kill process using specific port" -ForegroundColor White
    Write-Host "Kill-Hugo               - Kill all Hugo processes" -ForegroundColor White
    Write-Host "Start-Hugo              - Clean start Hugo server" -ForegroundColor White
}