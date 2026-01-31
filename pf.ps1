#!/usr/bin/env pwsh
<#
.SYNOPSIS
    MyPortfolio CLI - Short alias (pf) for quick access
.DESCRIPTION
    This is a shorter alias script that forwards to the main CLI
.EXAMPLE
    .\pf.ps1 dev
    .\pf.ps1 build
    .\pf.ps1 help
#>

# Get the directory where this script is located
$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }

# Change to project root
Push-Location $scriptRoot

# Run the CLI
node "$scriptRoot\cli.js" @args

Pop-Location
