import styles from "./styles.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UsersSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.title} />
      <div className={styles.btn} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">
              <div className={styles.table_content} />
            </TableHead>
            <TableHead className="text-center">
              <div className={styles.table_content} />
            </TableHead>
            <TableHead className="text-center">
              <div className={styles.table_content} />
            </TableHead>
            <TableHead className="text-center">
              <div className={styles.table_content} />
            </TableHead>
            <TableHead className="text-center">
              <div className={styles.table_content} />
            </TableHead>
            <TableHead className="text-center">
              <div className={styles.table_content} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-center">
              <div className={styles.index} />
            </TableCell>
            <TableCell className="flex justify-center items-center gap-2">
              <div className={styles.user_img} />
              <div className={styles.user_name} />
            </TableCell>
            <TableCell>
              <div className={styles.user_name} />
            </TableCell>
            <TableCell>
              <div className={styles.user_name} />
            </TableCell>
            <TableCell>
              <div className={styles.user_name} />
            </TableCell>
            <TableCell>
              <div className={styles.user_name} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-center">
              <div className={styles.index} />
            </TableCell>
            <TableCell className="flex justify-center items-center gap-2">
              <div className={styles.user_img} />
              <div className={styles.user_name} />
            </TableCell>
            <TableCell>
              <div className={styles.user_name} />
            </TableCell>
            <TableCell>
              <div className={styles.user_name} />
            </TableCell>
            <TableCell>
              <div className={styles.user_name} />
            </TableCell>
            <TableCell>
              <div className={styles.user_name} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-center">
              <div className={styles.index} />
            </TableCell>
            <TableCell className="flex justify-center items-center gap-2">
              <div className={styles.user_img} />
              <div className={styles.user_name} />
            </TableCell>
            <TableCell>
              <div className={styles.user_name} />
            </TableCell>
            <TableCell>
              <div className={styles.user_name} />
            </TableCell>
            <TableCell>
              <div className={styles.user_name} />
            </TableCell>
            <TableCell>
              <div className={styles.user_name} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersSkeleton;
