package users.test.serviceImpl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import users.test.model.Usuario;
import users.test.service.UsuarioService;
import users.test.repository.UsuarioRepository;


@Service
public class UsuarioServiceImpl implements UsuarioService {
	@Autowired
	UsuarioRepository usuarioRepository;

	@Override
	public List<Usuario> findAllUsers() {
		return  usuarioRepository.findAll();
	}

	@Override
	public Optional<Usuario> findUserById(Long id) {
		Optional<Usuario> user =  usuarioRepository.findById(id);
		return user;
	}
	
	@Override
	public Optional<Usuario> findUserByNombreIs(String nombre) {
		Optional<Usuario> user =  usuarioRepository.findUserByNombreIs(nombre);
		return user;
	}

	@Override
	public Usuario saveUser(Usuario customerNew) {
		if (customerNew != null) {
			return usuarioRepository.save(customerNew);
		}
		return new Usuario();
	}

	@Override
	public String deleteUser(Long id) {
		if (usuarioRepository.findById(id).isPresent()) {
			usuarioRepository.deleteById(id);
			return "Usuario eliminado correctamente.";
		}
		return "Error! El usuario no existe";
	}

	@Override
	public String updateUser(Usuario customerUpdated) {
		Long num = customerUpdated.getIdUsuario();
		if (usuarioRepository.findById(num).isPresent()) {
			Usuario usuarioToUpdate = new Usuario();
			usuarioToUpdate.setIdUsuario(customerUpdated.getIdUsuario());
			usuarioToUpdate.setIdRol(customerUpdated.getIdRol());
			usuarioToUpdate.setNombre(customerUpdated.getNombre());
			usuarioToUpdate.setActivo(customerUpdated.getActivo());

			usuarioRepository.save(usuarioToUpdate);
			return "Usuario modificado exitosomante";
		}
		return "Error al modificar el usuario";
	}
}
