import { List, ListItem, ListItemIcon, Typography } from "@material-ui/core";
import { StarHalfOutlined } from "@material-ui/icons";

function PostRules() {
  return (
    <div className="bg-white">
      {/* header */}
      <p
        className="text-center xl:text-lg 2xl:text-2xl font-semibold text-[#933a16] bg-[#ebebeb] border border-b-4 border-b-[#cc6c6c] rounded-md w-full mr-auto ml-auto"
        component="h1"
      >
        Posting Rules
      </p>

      {/* rules */}
      <List>
        <ListItem>
          <ListItemIcon>
            <StarHalfOutlined fontSize="small" color="secondary" />
          </ListItemIcon>
          <p className="text-sm text-[#933a16] font-medium">
            Ensure contents are original.
          </p>
        </ListItem>
      </List>

      <List>
        <ListItem>
          <ListItemIcon>
            <StarHalfOutlined fontSize="small" color="secondary" />
          </ListItemIcon>
          <p className="text-sm text-[#933a16] font-medium">
            Avoid fake misleading information.
          </p>
        </ListItem>
      </List>

      <List>
        <ListItem>
          <ListItemIcon>
            <StarHalfOutlined fontSize="small" color="secondary" />
          </ListItemIcon>
          <p className="text-sm text-[#933a16] font-medium">
            Avoid hate speeches.
          </p>
        </ListItem>
      </List>

      <List>
        <ListItem>
          <ListItemIcon>
            <StarHalfOutlined fontSize="small" color="secondary" />
          </ListItemIcon>
          <p className="text-sm text-[#933a16] font-medium">
            Do not harass or bully others.
          </p>
        </ListItem>
      </List>

      <List>
        <ListItem>
          <ListItemIcon>
            <StarHalfOutlined fontSize="small" color="secondary" />
          </ListItemIcon>
          <p className="text-sm text-[#933a16] font-medium">
            Ensure healthy debates.
          </p>
        </ListItem>
      </List>

      <List>
        <ListItem>
          <p className="text-sm text-[#933a16] font-medium">
            <em>Dislaimer</em>: Every oracle is entirely responsible for
            whatever content posted !!
          </p>
        </ListItem>
      </List>
    </div>
  );
}

export default PostRules;
