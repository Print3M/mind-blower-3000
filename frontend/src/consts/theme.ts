"use client"

import { DEFAULT_THEME, createTheme } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

export const theme = createTheme(DEFAULT_THEME);

export const vars = themeToVars(theme);