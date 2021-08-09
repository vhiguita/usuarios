package users.test.controllersImpl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import users.test.controllers.RolController;
import users.test.model.Rol;
import users.test.service.RolService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class RolControllerImpl  implements RolController{
	@Autowired
	RolService rolService;
	// http://localhost:8000/rols (GET)
	@RequestMapping(value = "/rols", method = RequestMethod.GET, produces = "application/json")
	@Override
	public List<Rol> getRols() {
		return rolService.findAllRols();
	}

}
