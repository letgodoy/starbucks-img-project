import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import { IconButton, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Layout } from "../../components";
import { useGetAllUsers, useToggleBlockUser } from "../../dataAccess";

export const ListUser = ({ params }: any) => {
  const { data, status: getUserStatus } = useGetAllUsers();
  const { mutateAsync, status: toggleBlockStatus } = useToggleBlockUser();

  const isLoading = getUserStatus === "loading" || toggleBlockStatus === "loading";
  const canRenderTable = getUserStatus === "success" && data && data?.length > 0;

  if (isLoading) return (
    <Layout params={params}>
      <Skeleton variant="rectangular" width='100%' height={64} sx={{ marginBottom: '8px' }} />
      <Skeleton variant="rectangular" width='100%' height={64} sx={{ marginBottom: '8px' }} />
      <Skeleton variant="rectangular" width='100%' height={64} sx={{ marginBottom: '8px' }} />
    </Layout>
  )

  return (
    <Layout params={params}>
      {canRenderTable &&
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((u) => (
              <TableRow>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  {u.isBlocked ? (
                    <IconButton edge="end" aria-label="delete" onClick={() => mutateAsync(u.uid)}>
                      <PlayIcon />
                    </IconButton>
                  ) : (
                    <IconButton edge="end" aria-label="delete" onClick={() => mutateAsync(u.uid)}>
                      <BlockIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>}
    </Layout>
  )
}