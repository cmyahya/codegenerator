package <%= packageName %>.actuator;

import org.springframework.boot.actuate.endpoint.annotation.Endpoint;
import org.springframework.boot.actuate.endpoint.annotation.ReadOperation;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Endpoint(id = "ready")
@Component
public class ReadyEndpoint {

    @ReadOperation
    public Map<String, Object> ready() {
        Map<String, Object> response = new HashMap<>();
        response.put("status","READY");

        return response;
    }
}
