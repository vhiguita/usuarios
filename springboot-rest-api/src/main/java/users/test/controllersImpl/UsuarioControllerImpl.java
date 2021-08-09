package users.test.controllersImpl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import users.test.controllers.UsuarioController;
import users.test.model.Usuario;
import users.test.service.UsuarioService;


@RestController
@CrossOrigin(origins="http://localhost:4200")
public class UsuarioControllerImpl implements UsuarioController {
	@Autowired
	UsuarioService customerService;

	// http://localhost:8000/usuarios (GET)
	@RequestMapping(value = "/usuarios", method = RequestMethod.GET, produces = "application/json")
	@Override
	public List<Usuario> getUsers() {
		return customerService.findAllUsers();
	}

	// http://localhost:8000/usuarios/1 (GET)
	@Override
	@RequestMapping(value = "/usuarios/{id}", method = RequestMethod.GET, produces = "application/json")
	public Optional<Usuario> getUserById(@PathVariable Long id) {
		return customerService.findUserById(id);
	}
	
	// http://localhost:8000/usuarios/getName/nombre (GET)
	@Override
	@RequestMapping(value = "/usuarios/getName/{name}", method = RequestMethod.GET, produces = "application/json")
	public Optional<Usuario> getUserByName(@PathVariable String name) {
		return customerService.findUserByNombreIs(name);
	}
	
	// http://localhost:8000/usuarios/add (ADD)
	@Override
	@RequestMapping(value = "/usuarios/add", method = RequestMethod.POST, produces = "application/json")
	public Usuario addUsuario(Usuario customer) {
		return customerService.saveUser(customer);
	}

	// http://localhost:8000/usuarios/delete/1 (GET)
	@Override
	@RequestMapping(value = "/usuarios/delete/{id}", method = RequestMethod.GET, produces = "application/json")
	public String deleteUsuario(@PathVariable Long id) {
		return customerService.deleteUser(id);
	}

	// http://localhost:8000/usuarios/update (PATCH)
	@Override
	@RequestMapping(value = "/usuarios/update", method = RequestMethod.POST, produces = "application/json")
	public String updateUsuario(Usuario customerNew) {
		return customerService.updateUser(customerNew);
	}

	// http://localhost:8000/test (GET)
	@RequestMapping(value = "/test", method = RequestMethod.GET, produces = "application/json")
	@Override
	public String test() {
		return "Test done";
	}
}
