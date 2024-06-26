package js.footballclubmng.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    UserServiceSecurity userServiceSecurity;


    @Autowired
    AuthenticationEntryPointHandler unauthorizedHandler;

    @Bean
    public AuthenticateFilterJwt jwtAuthenticationFilter() {
        return new AuthenticateFilterJwt();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.userDetailsService(userServiceSecurity)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/user/login").permitAll()
                .antMatchers("/api/user/register").permitAll()
                .antMatchers("/api/user/verify-otp").permitAll()
                .antMatchers("/api/user/generrate-otp").permitAll()
                .antMatchers("/api/user/update-password").permitAll()
                .antMatchers("/api/user/reset-password").permitAll()
                .antMatchers("/api/user/active-through-email").permitAll()
                .antMatchers("/api/news/news-detail/{id}").permitAll()
                .antMatchers("/api/news/list-news").permitAll()
                .antMatchers("/api/news/search-news").permitAll()
                .antMatchers("/api/news/list-top4-news").permitAll()
                .antMatchers("/api/player/list-player").permitAll()
                .antMatchers("/api/player/detail-player/{id}").permitAll()
                .antMatchers("/api/player/search-player").permitAll()
                .antMatchers("/api/category/list-category").permitAll()
                .antMatchers("/api/cart/view-cart").permitAll()
                .antMatchers("/api/cart/add-cart-item/{productId}").permitAll()
                .antMatchers("/api/cart/customise-add-cart-item/{productId}").permitAll()
                .antMatchers("/api/product/search-product").permitAll()
                .antMatchers("/api/product/details-product/{id}").permitAll()
                .antMatchers("/api/product/list-product").permitAll()
                .antMatchers("/api/news/list-news-type").permitAll()
                .antMatchers("/api/category/search-category").permitAll()
                .antMatchers("/api/fixtures/list-fixtures").permitAll()
                .antMatchers("/api/fixtures/list-fixtures").permitAll()
                .antMatchers("/api/category/search-category").permitAll()
                .antMatchers("/api/payment/transaction-payment").permitAll()
                .antMatchers("/api/product/product-with/{productId}").permitAll()
                .antMatchers("/api/product/filter-product").permitAll()

                .anyRequest()
                .authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        httpSecurity.logout().logoutUrl("api/logout").permitAll();

        httpSecurity.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
