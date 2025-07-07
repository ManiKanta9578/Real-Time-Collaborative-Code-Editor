'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark')
            setIsDark(true)
        } else {
            document.documentElement.classList.remove('dark')
            setIsDark(false)
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark'
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
        setIsDark(!isDark)
    }

    return (
        <button
            onClick={toggleTheme}
            className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 bg-gray-300 dark:bg-gray-800`}
        >
            <div
                className={`w-6 h-6 flex justify-center items-center rounded-full shadow-md transform transition-transform duration-300 
                        ${isDark ? "translate-x-6" : "translate-x-0"}`}
            >
                <span className="text-xl">{isDark ? '🌙' : '☀️'}</span>
            </div>
        </button>
    )
}
