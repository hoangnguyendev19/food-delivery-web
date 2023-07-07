package com.shoppingcart.shoppingcartbackend.security;

import com.shoppingcart.shoppingcartbackend.models.Account;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
//@Component
public class CustomUserDetails implements UserDetails {
    private Account account;
    private Collection<? extends GrantedAuthority> authorities;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    public static CustomUserDetails mapAccountToUserDetail(Account account) {
        List<GrantedAuthority> authorityList = account.getRoleList().stream()
                .map((role -> new SimpleGrantedAuthority(role.getRoleName().name())))
                .collect(Collectors.toList());
        return new CustomUserDetails(account, authorityList);
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    @Override
    public String getUsername() {
        return account.getUserName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
