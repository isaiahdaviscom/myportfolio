#!/usr/bin/env pwsh
<#
.SYNOPSIS
    MyPortfolio CLI - Quick access wrapper for 'portfolio' command
.DESCRIPTION
    This is an alias script that forwards to the main CLI
.EXAMPLE
    .\portfolio.ps1 dev
    .\portfolio.ps1 build
    .\portfolio.ps1 help
#>

# Get the directory where this script is located
$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }

# Change to project root
Push-Location $scriptRoot

# Run the CLI
node "$scriptRoot\cli.js" @args

Pop-Location
