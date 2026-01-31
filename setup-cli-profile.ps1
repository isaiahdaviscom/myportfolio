# MyPortfolio CLI - PowerShell Profile Setup
# Add this to your PowerShell profile to make 'portfolio' available globally

# Get the project root (adjust if running from elsewhere)
$projectRoot = "$env:USERPROFILE\OneDrive\Desktop\MyProjects\myportfolio"

# Create function aliases for global access
function portfolio {
    param([string[]]$Arguments)
    & "$projectRoot\portfolio.ps1" @Arguments
}

function pf {
    param([string[]]$Arguments)
    & "$projectRoot\pf.ps1" @Arguments
}

# Set-Alias portfolio "& $projectRoot\portfolio.ps1"
# Set-Alias pf "& $projectRoot\pf.ps1"

Write-Host "✓ MyPortfolio CLI loaded! Use 'portfolio' or 'pf' from anywhere." -ForegroundColor Green
Write-Host "  Example: portfolio dev" -ForegroundColor Cyan
