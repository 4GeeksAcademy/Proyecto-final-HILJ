const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			itineraries: [],
			token: '',
			newItineraryData: {
				title: '',
				description: '',
				duration: undefined,
				city: '',
				itinerary: {},
				images: {"img": []}
			}
		},
			actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			addDay: (count, info) => {
				const store = getStore();
				const newItinerary = { ...store.newItineraryData.itinerary };

				newItinerary[`Día ${count}`] = info;

				setStore({
					newItineraryData: {
						...store.newItineraryData,
						itinerary: newItinerary,
						duration: Object.keys(newItinerary).length
					}
				});
			},
			setNewItineraryData: (data) => {
				const store = getStore();
				setStore({
				  ...store,
				  newItineraryData: data.itinerary,
				});
			  },
			deleteDay: (key) => {
				const store = getStore();
				const deleteItinerary = { ...store.newItineraryData.itinerary };
			  
				// Eliminar el día seleccionado
				delete deleteItinerary[key];
			  
				// Crear un nuevo objeto con las claves actualizadas
				const newItinerary = {};
				let dayIndex = 1;
			  
				// Recorrer el itinerario modificado y reasignar claves
				Object.keys(deleteItinerary)
				  .sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1])) // Ordenar las claves por el número del día
				  .forEach((oldKey) => {
					newItinerary[`Día ${dayIndex}`] = deleteItinerary[oldKey];
					dayIndex++;
				  });
			  
				// Actualizar el estado con el itinerario con las claves actualizadas
				setStore({
				  newItineraryData: {
					...store.newItineraryData,
					itinerary: newItinerary,
					duration: Object.keys(newItinerary).length
				  }
				});
			  },
			addImg: (url) => {
				const store = getStore();
				const newImage = { ...store.newItineraryData.images };

				newImage.img.push(url)

				setStore({
					newItineraryData: {
						...store.newItineraryData,
						images: newImage
					}
				});
			},
			setTitle: (title) => {
				const store = getStore();
				setStore({
					newItineraryData: {
						...store.newItineraryData,
						title: title
					}
				});
			},	
			setDescription: (description) => {
				const store = getStore();
				setStore({
					newItineraryData: {
						...store.newItineraryData,
						description: description
					}
				});
			},
			
			setCity: (city) => {
				const store = getStore();
				setStore({
					newItineraryData: {
						...store.newItineraryData,
						city: city
					}
				});
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			register: async (formData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/register',{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							accept: 'application/json'
						},
						body: JSON.stringify(formData)
					});
					const data = await resp.json();

					if (!resp.ok) {
						const errorMsg = data.msg
						throw new Error(errorMsg);
					}
					setStore({token: data.access_token, user: data.user});
					localStorage.setItem('token', data.access_token)
					return { success: true }
				} catch (error) {
					console.error('Error creating user:', error.message);
       				return { success: false, msg: error.message };
				}
			},
			login: async (formData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							accept: 'application/json'
						},
						body: JSON.stringify(formData)
					});
					const data = await resp.json();

					if (!resp.ok) {
						const errorMsg = data.msg
						throw  new Error(errorMsg);
					}
					setStore({token: data.access_token, user: data.user});
					localStorage.setItem('token', data.access_token)
					return { success: true }
				} catch (error) {
					console.error('Error login user:', error.message);
       				return { success: false, msg: error.message };
				}
			},
			validateToken: async (token) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/validate-token', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							accept: 'application/json',
							Authorization: `Bearer ${token}`,
						}
					});
					const data = await resp.json();
					if (data.success){
						setStore({token : token})
						return true
					}
					else {
						localStorage.removeItem('token')
						return false
					}
				} catch (error) {
					console.log('Regístrate! :)')
				}
			}
		}
	};
};

export default getState;