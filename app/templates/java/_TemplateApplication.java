package <%= packageName %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class <%= className %>Application {

	public static void main(String[] args) {
		SpringApplication.run(<%= className %>Application.class, args);

	}
}