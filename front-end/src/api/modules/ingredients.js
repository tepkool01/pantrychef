import axios from 'axios'
import store from '../../store';

export default {
	getIngredients() {
		const config = { headers: { "Authorization": store.state.users.user.idToken }};
		return axios.get('/ingredients', config);
	}
}
