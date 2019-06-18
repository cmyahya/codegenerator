package <%= packageName %>.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service("<%= className.toLowerCase() %>Service")
public class <%= className %>ServiceImpl implements <%= className %>Service{
    private static final Logger log = LoggerFactory.getLogger("<%= className %>ServiceImpl");

    @Override
    public String sayHello() {
        log.debug("returning greetings");
        return "Hello! Welcome to generated code.";
    }
}