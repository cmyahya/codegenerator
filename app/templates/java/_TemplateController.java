package <%= packageName %>.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import <%= packageName %>.service.<%= className %>Service;
/**
 * 
 * @author Seed
 *
 */
@RestController
@Api(value = "<%= className.toLowerCase() %>")
public class <%= className %>Controller {	
	private static final Logger log = LoggerFactory.getLogger("<%= className %>Controller");

	@Autowired
	private <%= className %>Service <%= className.toLowerCase() %>Service;
	
	@RequestMapping(value = "/greetings", method = RequestMethod.GET)
    @ApiOperation(value = "Returns greetings to the consumer")
    @ApiResponses( value = {
            @ApiResponse(code=400,message="Invalid request"),
            @ApiResponse(code=500,message="Error processing request")
    })
	public String greetings(){
      log.debug("Invoking greetings service...");
      return <%= className.toLowerCase() %>Service.sayHello();
    }
}