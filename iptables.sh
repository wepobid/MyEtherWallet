sudo iptables -L
# sudo iptables -I INPUT 1 -i lo -j ACCEPT
# sudo iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
# sudo iptables -A OUTPUT -p tcp -d registry.npmjs.org --dport 443 -j ACCEPT
# sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
# sudo iptables -P INPUT DROP
# sudo iptables -P OUTPUT DROP