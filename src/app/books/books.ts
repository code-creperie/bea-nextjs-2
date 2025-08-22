export interface Book {
    id: string;
    name: string;
    description: string;
  }
  
export const books: Book[] = [
    { id: '1', name: 'Inteligencia Artificial Simbólica: De la Lógica al Razonamiento Automatizado', description: 'This book written in Spanish by Raúl Mazo traces the path of symbolic AI, from its foundations in formal logic to the development of automated reasoning systems. It’s a comprehensive guide to building intelligent agents that actually understand the rules before they play the game.' },
    { id: '2', name: 'Modern Web Engineering with Spring Boot: Build Robust Java-Based Web Applications Using MVC Architecture and Engineering Principles', description: 'This book written by Raúl Mazo and Gabriel Camargo guides developers on building robust, Java-based web applications with the Spring Boot framework. You will learn to engineer solutions that are scalable, maintainable, and will not wake you up with a server alert at 3 AM.' },
    { id: '3', name: 'Mastering Web Architecture with Laravel: Professional Development with MVC Patterns and Modern Engineering Principles', description: 'This book written by Raúl Mazo and Gabriel Camargo details how to master web architecture for professional development using the Laravel framework. It is your chance to build applications with the elegance Laravel promises, backed by the solid engineering that prevents them from becoming a beautiful mess.' },
    { id: '4', name: 'Engineering Modern Web Apps with Next.js: Full-Stack Architecture with Modern Patterns and Engineering Principles for React Developers', description: 'This book written by Raúl Mazo and Gabriel Camargo serves as a guide for React developers on engineering full-stack web applications with Next.js. Now you will be able to build powerful full-stack apps without getting lost in a jungle of configuration files!' },
  ];