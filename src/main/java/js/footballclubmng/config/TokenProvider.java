package js.footballclubmng.config;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TokenProvider {
    private static final Logger logger =  LoggerFactory.getLogger(TokenProvider.class);

    private final String JWT_SECRET = "SWPSEMISTER9KJASHFKJHDKSHFDLKASHFLKASWPSEMISTER9KJASHFKJHDKSHFDLKASHFLKASWPSEMISTER9KJASHFKJHDKSHFDLKASHFLKA";

    private final long JWT_EXPIRATION = 12 * 60 * 60 * 1000L;


    public String generateJwtToken(String username) {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return String.valueOf(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e);
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e);
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e);
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}",e);
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e);
        }
        return false;
    }
}
