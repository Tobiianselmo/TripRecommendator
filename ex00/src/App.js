// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './styles.css';
const App = () => {
	const [inputText, setInputText] = useState('');
	const [responseText, setResponseText] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Evitar múltiples envíos
		if (isLoading) return;

		setIsLoading(true); // Indicar que la solicitud está en proceso

		try {
			const res = await axios.post(
				'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDileyrbzwpAQ6nzhWAeiLWEqbq-mEgz9Y', // Reemplaza con tu clave API
				{
					contents: [
						{
							parts: [
								{
									text: `Sugiereme sitios para visitar en ${inputText} en forma de Bullets Points con * sin descripciones, cada ubicacion en una linea `, // Formatear la entrada
								},
							],
						},
					],
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			// Extraer solo el texto de la respuesta
			const generatedText = res.data.candidates[0].content.parts[0].text; // Acceder solo al texto de la respuesta
			setResponseText(generatedText);
		} catch (error) {
			console.error('Error al hacer la solicitud:', error);
			setResponseText('Error en la solicitud a Gemini');
		} finally {
			setIsLoading(false); // Restablecer el estado de carga
		}
	};

	return (
		<div className="App">
			<nav class="navbar">
				<div class="navbar-left">
					<div class="navbar-title-container">
						<button class="menu-button" aria-label="Open menu" onclick="toggleMenu()">
							&#9776;
						</button>
						<img src="trip-icon.ico" alt="Trip Recommendator Icon" class="navbar-icon" />
						<h1 class="navbar-title">Trip Recommendator</h1>
					</div>
					<div class="side-menu" id="sideMenu">
						<button class="close-button" aria-label="Close menu" onclick="toggleMenu()">x</button>
						<ul>
							<li><a href="#">Destinos</a></li>
							<li><a href="#">Recomendaciones</a></li>
							<li><a href="#">Blog de Viajes</a></li>
							<li><a href="#">Contáctanos</a></li>
						</ul>
					</div>
				</div>
				<div class="navbar-right">
					<button class="login-button">Iniciar Sesión</button>
				</div>
			</nav>

			<div class="search-container">
				<h2 class="search-title">¿A qué lugar te gustaría viajar?🛫</h2>
				<form class="search-form" onSubmit={handleSubmit}>
					<input type="text" class="search-input" placeholder="Escribe tu destino aquí..."
						required onChange={(e) => setInputText(e.target.value)} value={inputText} />
					<button type="submit" class="search-button" disabled={isLoading}>
						{isLoading ? 'Enviando...' : 'Enviar'} </button>
				</form>
				{responseText && (
					<div>
						<h3>Lugares para visitar:</h3>
						{responseText.split('*').map((item, index) => (
							<p key={index}>{item}</p>
						))}
					</div>
				)}
			</div>


		</div>
	);
};

export default App;
