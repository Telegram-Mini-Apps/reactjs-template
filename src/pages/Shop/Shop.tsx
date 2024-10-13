import { Cell, Link, List, Section } from "@telegram-apps/telegram-ui";

export const Shop = () => {
  return (
    <div>
      <List>
        <Section header="Shop page">
          {/* FIXME */}
          <Link to="/shop/clothes">
            <Cell>clothes</Cell>
          </Link>
          <Link to="/shop/locations">
            <Cell>locations</Cell>
          </Link>
        </Section>
      </List>
    </div>
  );
};
