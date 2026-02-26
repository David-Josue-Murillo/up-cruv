export const styles = () => {
  
  /*
  * MobileMenuButton
  */
  const drawerStyle = {
    background: "rgba(11, 49, 35, 0.95)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderLeft: "1px solid rgba(212, 175, 55, 0.1)",
  } as const;

  /*
  * NavItemButton
  */
  const dropdownPanelStyle = {
    background: "rgba(11, 49, 35, 0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(212, 175, 55, 0.15)",
    boxShadow: "0 20px 60px -15px rgba(0,0,0,0.4), 0 0 40px -10px rgba(212,175,55,0.08)",
  } as const;
  
  const goldStripeStyle = {
    background: "linear-gradient(90deg, transparent, var(--color-gold-500), transparent)",
  } as const;
  
  const activeIndicatorBase = {
    background: "linear-gradient(90deg, transparent, var(--color-gold-500), transparent)",
  } as const;

  return {
    drawerStyle,
    dropdownPanelStyle,
    goldStripeStyle,
    activeIndicatorBase
  }
}
