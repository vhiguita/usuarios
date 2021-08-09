package users.test.serviceImpl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import users.test.model.Rol;
import users.test.service.RolService;
import users.test.repository.RolRepository;

@Service
public class RolServiceImpl implements RolService{
	@Autowired
	RolRepository rolRepository;

	@Override
	public List<Rol> findAllRols() {
		return  rolRepository.findAll();
	}
}
